import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
} from "@mui/material";

export default function EstabelecimentoCard({ estabelecimento }) {
  return (
    <Card
      component={Link}
      to={`/estabelecimento/${estabelecimento.id}`}
      sx={{
        display: "flex",
        gap: 2,
        textDecoration: "none",
        alignItems: "center",
        p: 1,
      }}
      elevation={2}
    >
      <CardMedia
        component="img"
        image={estabelecimento.imagem}
        alt={estabelecimento.nome}
        sx={{ width: 96, height: 96, borderRadius: 2, objectFit: "cover", ml: 1 }}
      />
      <CardContent sx={{ py: 1 }}>
        <Typography variant="h6">{estabelecimento.nome}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {estabelecimento.descricao}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Chip icon={<span>📍</span>} label={estabelecimento.endereco} size="small" />
        </Box>
      </CardContent>
    </Card>
  );
}
