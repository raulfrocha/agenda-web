import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, Button, Stack, Paper } from "@mui/material";
import { getAgendamentos } from "../utils/storage";
import { estabelecimentos } from "../data/estabelecimentos";
import { removerAgendamento } from "../utils/storage";

export default function Agendamentos() {
  const { id } = useParams();
  const est = estabelecimentos.find((e) => e.id == id);

  const [lista, setLista] = useState([]);

  useEffect(() => {
    const ag = getAgendamentos();
    const dados = ag[id] || {};

    const arr = Object.entries(dados).flatMap(([data, horas]) =>
      horas.map((hora) => ({ data, hora, chave: `${data}-${hora}` }))
    );

    arr.sort((a, b) => a.data.localeCompare(b.data) || a.hora.localeCompare(b.hora));
    setLista(arr);
  }, [id]);

  function cancelar(item) {
    removerAgendamento(id, item.data, item.hora);
    setLista((l) => l.filter((x) => x.chave !== item.chave));
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Agendamentos — {est?.nome}
      </Typography>

      {lista.length === 0 ? (
        <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
          Nenhum agendamento encontrado.
        </Typography>
      ) : (
        <Stack spacing={2} mt={2}>
          {lista.map((item) => (
            <Paper key={item.chave} sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box>
                <Typography fontWeight={600}>{item.hora}</Typography>
                <Typography color="text.secondary">{item.data}</Typography>
              </Box>
              <Button color="error" variant="contained" onClick={() => cancelar(item)}>
                Cancelar
              </Button>
            </Paper>
          ))}
        </Stack>
      )}
    </Container>
  );
}
