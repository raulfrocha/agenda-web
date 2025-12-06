import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function WeeklyAgenda({ weekDays, timeSlots, agendados, onSelect }) {
  // agendados array tem itens no formato "DD/MM-HH:mm"
  const isOcupado = (date, hora) => agendados.includes(`${date}-${hora}`);

  return (
    <Paper elevation={2} sx={{ overflowX: "auto" }}>
      <Box sx={{ minWidth: 720 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 120 }}>Horário</TableCell>
              {weekDays.map((d) => (
                <TableCell key={d.date} align="center">
                  <Typography variant="subtitle2">{d.label}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {d.date}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {timeSlots.map((hora) => (
              <TableRow key={hora}>
                <TableCell>{hora}</TableCell>
                {weekDays.map((day) => {
                  const ocupado = isOcupado(day.date, hora);
                  return (
                    <TableCell key={`${day.date}-${hora}`} align="center" sx={{ py: 1 }}>
                      {ocupado ? (
                        <Tooltip title="Ocupado">
                          <IconButton size="small" disabled>
                            <CloseIcon color="error" />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Box
                          onClick={() => onSelect(day.date, hora)}
                          sx={{
                            cursor: "pointer",
                            display: "inline-flex",
                            px: 2,
                            py: 0.5,
                            borderRadius: 1,
                            bgcolor: "primary.100",
                            color: "primary.main",
                            "&:hover": { bgcolor: "primary.200" },
                          }}
                        >
                          Reservar
                        </Box>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
}
