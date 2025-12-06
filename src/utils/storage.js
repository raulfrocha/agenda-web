// helper simples para persistir agendamentos em localStorage
// Estrutura: { [estId]: { "DD/MM": ["HH:mm", ...] } }
const KEY = "agendamentos";

export function getAgendamentos() {
  const raw = localStorage.getItem(KEY);
  try {
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getAgendamentosByEstabelecimentoId(id) {
  const all = getAgendamentos();
  const est = all[id] || {};
  // converter para lista do formato antigo: ["DD/MM-HH:mm", ...]
  const arr = [];
  Object.entries(est).forEach(([data, horas]) => {
    horas.forEach((h) => arr.push(`${data}-${h}`));
  });
  return arr;
}

export function salvarAgendamento(estId, data, hora) {
  const all = getAgendamentos();
  if (!all[estId]) all[estId] = {};
  if (!all[estId][data]) all[estId][data] = [];
  if (!all[estId][data].includes(hora)) {
    all[estId][data].push(hora);
    localStorage.setItem(KEY, JSON.stringify(all));
    return true;
  }
  return false;
}

export function removerAgendamento(estId, data, hora) {
  const all = getAgendamentos();
  if (!all[estId] || !all[estId][data]) return false;
  all[estId][data] = all[estId][data].filter((h) => h !== hora);
  if (all[estId][data].length === 0) delete all[estId][data];
  if (Object.keys(all[estId]).length === 0) delete all[estId];
  localStorage.setItem(KEY, JSON.stringify(all));
  return true;
}
