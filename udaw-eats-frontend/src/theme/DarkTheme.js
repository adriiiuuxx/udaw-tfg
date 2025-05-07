import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2667ff",
    },
    secondary: {
      main: "#2667ff",
    },
    black: {
        main: "#0D0D0D",
        },
    background: {
        main: "#000000",
        default: "#0D0D0D",
        paper: "#0D0D0D",
        },
        textColor: {
        main: "#111111",
        },
  }});