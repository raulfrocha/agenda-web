// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#60a5fa", // azul claro bonito no dark
    },
    secondary: {
      main: "#34d399",
    },
    background: {
      default: "#18181b",  // fundo geral
      paper: "#27272a",    // fundo de cards/modal
    },
  },

  typography: {
    fontFamily: "Inter, sans-serif",
  },

  components: {
    MuiDialog: {
      defaultProps: {
        fullWidth: true,
        maxWidth: "sm",
      },
    },
  },
});

export default theme;
