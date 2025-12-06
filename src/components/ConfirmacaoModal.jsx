// src/components/ConfirmacaoModal.jsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";

export default function ConfirmacaoModal({
  isOpen,
  horario,
  estabelecimento,
  onClose,
  onConfirm,
  cliente,
  setCliente,
}) {
  if (!horario) return null;

  const dataFormatada = new Date(horario.data).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        <Typography variant="h5" fontWeight="bold">
          Agendar com {estabelecimento.nome}
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Alert severity="info" sx={{ mb: 2 }}>
          Você escolheu:{" "}
          <strong>
            {dataFormatada} às {horario.hora}
          </strong>
        </Alert>

        <TextField
          fullWidth
          label="Seu Nome"
          variant="outlined"
          margin="normal"
          value={cliente.nome}
          onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
        />

        <TextField
          fullWidth
          label="Telefone (WhatsApp)"
          variant="outlined"
          margin="normal"
          value={cliente.telefone}
          onChange={(e) =>
            setCliente({ ...cliente, telefone: e.target.value })
          }
          placeholder="(42) 99999-0000"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Mudar horário
        </Button>

        <Button
          onClick={onConfirm}
          variant="contained"
          color="primary"
          sx={{ fontWeight: "bold" }}
        >
          Confirmar e Agendar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
