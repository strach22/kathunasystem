import { useReducer } from "react";

import PropTypes from "prop-types";

import clients from "../../data/clients.json";
import controlInfo from "../../data/controlInfo.json";
import ClientsContext from "./ClientsContext";

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_CLIENTS":
      return { ...state, clients: action.value };

    case "UPDATE_CONTROL_INFO":
      return { ...state, controlInfo: action.value };

    case "UPDATE_SYSTEM_DATA":
      return { ...state, systemData: action.value };

    case "EDIT_CLIENT":
      return { ...state, clientInfo: action.value };

    case "RESET_CLIENT_INFO":
      return { ...state, clientInfo: action.value };

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
function ClientsState({ children }) {
  const initialstate = {
    controlInfo,
    clients,
    clientInfo: null,
    systemData: {
      SBstate: false,
      SBinfo: {
        color: "success",
        icon: "check",
        tittle: "Clientes",
        content: "Cliente Agregado",
      },
    },
  };

  const [state, dispatch] = useReducer(reducer, initialstate);

  const uploadControlInfo = (info) => {
    dispatch({
      type: "UPDATE_CONTROL_INFO",
      value: info,
    });
  };

  const addClient = (newClient) => {
    const newClients = state.clients;
    const i = newClients.map((e) => e.id).indexOf(newClient.id);
    if (i === -1) newClients.push(newClient);
    else newClients[i] = newClient;

    dispatch({
      type: "UPDATE_CLIENTS",
      value: newClients,
    });
  };

  const uploadClients = (data) => {
    const newClients = state.clients.concat(data);
    dispatch({
      type: "UPDATE_CLIENTS",
      value: newClients,
    });
  };

  const eraseClient = (id) => {
    const newClients = state.clients.filter((client) => client.id !== id);
    dispatch({
      type: "UPDATE_CLIENTS",
      value: newClients,
    });
  };

  const addClientHistory = (id, data) => {
    state.controlInfo.totalTransactions += parseFloat(data.value);
    const newClients = state.clients;
    const i = newClients.map((e) => e.id).indexOf(id);
    newClients[i].savingHistory.push(data);
    newClients[i].savingBalance = data.actualBalance;
    dispatch({
      type: "UPDATE_CLIENTS",
      value: newClients,
    });
  };

  const updateClients = (newClients) => {
    dispatch({
      type: "UPDATE_CLIENTS",
      value: newClients,
    });
  };

  const addClientCredit = (id, data) => {
    const newClients = state.clients;
    const i = newClients.map((e) => e.id).indexOf(id);
    newClients[i].credits.push(data);
    newClients[i].creditBalance =
      parseFloat(data.actualLoan) + parseFloat(newClients[i].creditBalance);
    dispatch({
      type: "UPDATE_CLIENTS",
      value: newClients,
    });
  };

  // Guardar datos para editar cliente
  const editClient = (info) => {
    const bitrhTempo = info.birthDate;
    const creationTempo = info.creationDate;
    const newInfo = info;
    newInfo.birthDate = new Date(bitrhTempo);
    newInfo.creationDate = new Date(creationTempo);
    dispatch({
      type: "EDIT_CLIENT",
      value: newInfo,
    });
  };

  const resetClientInfo = () => {
    dispatch({
      type: "RESET_CLIENT_INFO",
      value: null,
    });
  };

  const editSystemData = (data) => {
    dispatch({
      type: "UPDATE_SYSTEM_DATA",
      value: data,
    });
  };

  return (
    <ClientsContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        clients: state.clients,
        clientInfo: state.clientInfo,
        controlInfo: state.controlInfo,
        systemData: state.systemData,
        addClient,
        eraseClient,
        uploadClients,
        editClient,
        resetClientInfo,
        addClientHistory,
        updateClients,
        addClientCredit,
        uploadControlInfo,
        editSystemData,
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
}

ClientsState.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ClientsState;
