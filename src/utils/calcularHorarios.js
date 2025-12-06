import { getAgendamentos } from "./storage.js"; // coloque .js se preferir, ajuda em alguns setups

// Gera horários no intervalo (intervalo de 60 minutos para manter simples)
export function gerarHorariosDoDia(abertura, fechamento) {
  const horarios = [];
  let horaAtual = abertura;

  while (horaAtual < fechamento) {
    horarios.push(horaAtual);

    const [h, m] = horaAtual.split(":").map(Number);
    const nova = new Date();
    nova.setHours(h, m + 60);

    const hh = String(nova.getHours()).padStart(2, "0");
    const mm = String(nova.getMinutes()).padStart(2, "0");

    horaAtual = `${hh}:${mm}`;
  }

  return horarios;
}


export function horariosDisponiveis(id, data, funcionamento, agendadosJSON) {
  // base de horários segundo funcionamento
  const base = gerarHorariosDoDia(
    funcionamento[id].abertura,
    funcionamento[id].fechamento
  );

  // horários bloqueados vindo do JSON estático (se houver)
  const bloqueadosJSON = (agendadosJSON && agendadosJSON[id] && agendadosJSON[id][data]) ? agendadosJSON[id][data] : [];

  // horários bloqueados vindos do localStorage
  const local = getAgendamentos();
  const bloqueadosLocal = (local && local[id] && local[id][data]) ? local[id][data] : [];

  const bloqueados = [...new Set([...bloqueadosJSON, ...bloqueadosLocal])];

  return base.filter((h) => !bloqueados.includes(h));
}

export function getInicioDaSemana(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 = domingo, 1 = segunda...

  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(d.setDate(diff));
  return monday;
}
