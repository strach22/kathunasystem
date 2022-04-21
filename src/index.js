import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Soft UI Context Provider
import { MaterialUIControllerProvider } from "context";
import ClientsState from "./context/Clients/ClientsState";

ReactDOM.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <ClientsState>
        <App />
      </ClientsState>
    </MaterialUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
