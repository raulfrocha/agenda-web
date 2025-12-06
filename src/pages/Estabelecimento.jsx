import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Paper, Chip, Stack } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import WeeklyAgenda from "../components/AgendaSemanal";
import ConfirmacaoModal from "../components/ConfirmacaoModal";
import { estabelecimentos } from "../data/estabelecimentos";
import {
  getAgendamentosByEstabelecimentoId,
  salvarAgendamento,
} from "../utils/storage";

export default function Estabelecimento() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [est, setEst] = useState(null);
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [cliente, setCliente] = useState({ nome: "", telefone: "" });
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    const e = estabelecimentos.find((x) => String(x.id) === String(id));
    if (!e) {
      navigate("/");
      return;
    }
    setEst(e);
    setAgendamentos(getAgendamentosByEstabelecimentoId(id));
    const savedCliente = localStorage.getItem("agende_cliente_info");
    if (savedCliente) setCliente(JSON.parse(savedCliente));
    setLoading(false);
  }, [id, navigate]);

  useEffect(() => {
    if (modalAberto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalAberto]);

  if (loading || !est) return <Container>Carregando...</Container>;

  const getWeeklyData = () => {
    const today = new Date();
    const weekDays = [];
    const timeSlots = [];

    for (let i = 1; i <= 7; i++) {
      const next = new Date(today);
      next.setDate(today.getDate() + i);

      if (est.diasDisponiveis.includes(next.getDay())) {
        weekDays.push({
          label: next.toLocaleDateString("pt-BR", { weekday: "short" }),
          date: next.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
        });
      }
    }

    for (let h = est.horarioFuncionamento.inicio; h < est.horarioFuncionamento.fim; h++) {
      for (let m = 0; m < 60; m += est.horarioFuncionamento.intervalo) {
        timeSlots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
      }
    }

    return { weekDays, timeSlots };
  };

  const { weekDays, timeSlots } = getWeeklyData();

  function agendar(data, hora) {
    setHorarioSelecionado({ data, hora });
    setModalAberto(true);
  }

  function confirmarAgendamento() {
    if (!cliente.nome || !cliente.telefone) {
      alert("Preencha seu nome e telefone!");
      return;
    }
    salvarAgendamento(id, horarioSelecionado.data, horarioSelecionado.hora);
    localStorage.setItem("agende_cliente_info", JSON.stringify(cliente));
    setModalAberto(false);
    navigate(`/confirmacao?est=${id}&data=${horarioSelecionado.data}&hora=${horarioSelecionado.hora}&nome=${cliente.nome}`, { state: { estabelecimento: est.nome }});
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }} elevation={2}>
        <Typography variant="h4">{est.nome}</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          {est.descricao}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Chip label={est.endereco} />
          {est.telefone && <Chip label={est.telefone} color="primary" variant="outlined" />}
        </Stack>
      </Paper>

      <Typography variant="h6" sx={{ mb: 2 }}>Selecione seu horário</Typography>

      <Box sx={{ mb: 2 }}>
        <WeeklyAgenda
          weekDays={weekDays}
          timeSlots={timeSlots}
          agendados={agendamentos}
          onSelect={agendar}
        />
      </Box>

      <Paper sx={{ p: 2, bgcolor: "#27272a" }}>
        Toque em um horário disponível para agendar.
      </Paper>

      <ConfirmacaoModal
        isOpen={modalAberto}
        horario={horarioSelecionado}
        estabelecimento={est}
        cliente={cliente}
        setCliente={setCliente}
        onClose={() => {
          setModalAberto(false);
          setHorarioSelecionado(null);
        }}
        onConfirm={confirmarAgendamento}
      />
    </Container>
  );
}
