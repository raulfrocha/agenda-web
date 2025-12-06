import React from "react";
import { Container, Typography, Stack } from "@mui/material";
import { estabelecimentos } from "../data/estabelecimentos";
import EstabelecimentoCard from "../components/EstabelecimentoCard";

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Estabelecimentos
      </Typography>

      <Stack spacing={2} mt={2}>
        {estabelecimentos.map((e) => (
          <EstabelecimentoCard key={e.id} estabelecimento={e} />
        ))}
      </Stack>
    </Container>
  );
}
