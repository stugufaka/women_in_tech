import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthProvider from "./utils/AuthProvider";
import { createTheme, NextUIProvider } from "@nextui-org/react";

const darkTheme = createTheme({
  type: "dark",
  theme: {},
});

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <NextUIProvider theme={darkTheme}>
        <App />
      </NextUIProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
