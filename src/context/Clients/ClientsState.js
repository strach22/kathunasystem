import { useReducer } from "react";

import PropTypes from "prop-types";

import clients from "../../data/clients.json";
import controlInfo from "../../data/controlInfo.json";
import ClientsContext from "./ClientsContext";

function reducer(state, action) {
  switch (action.type) {
    case "UPLOAD_CLIENTS":
      return { ...state, clients: action.value };

    case "UPLOAD_CONTROL_INFO":
      return { ...state, controlInfo: action.value };

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
  };

  const [state, dispatch] = useReducer(reducer, initialstate);

  const addClient = (newClient) => {
    const newClients = state.clients;
    const i = newClients.map((e) => e.id).indexOf(newClient.id);
    if (i === -1) newClients.push(newClient);
    else newClients[i] = newClient;

    dispatch({
      type: "UPLOAD_CLIENTS",
      value: newClients,
    });
  };

  const uploadClients = (data) => {
    const newClients = state.clients.concat(data);
    dispatch({
      type: "UPLOAD_CLIENTS",
      value: newClients,
    });
  };

  const uploadControlInfo = (info) => {
    const newInfo = info;
    dispatch({
      type: "UPLOAD_CONTROL_INFO",
      value: newInfo,
    });
  };

  const eraseClient = (id) => {
    const newClients = state.clients.filter((client) => client.id !== id);
    dispatch({
      type: "UPLOAD_CLIENTS",
      value: newClients,
    });
  };

  const addClientHistory = (id, data) => {
    const newClients = state.clients;
    const i = newClients.map((e) => e.id).indexOf(id);
    newClients[i].savingHistory.push(data);
    newClients[i].savingBalance = data.actualBalance;
    dispatch({
      type: "UPLOAD_CLIENTS",
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
      type: "UPLOAD_CLIENTS",
      value: newClients,
    });
  };

  const addCreditHistory = (id, idFile, data) => {
    const newClients = state.clients;
    const i = newClients.map((e) => e.id).indexOf(id);
    const i2 = newClients[i].credits.map((e) => e.id).indexOf(idFile);
    newClients[i].credits[i2].creditHistory.push(data);
    dispatch({
      type: "UPLOAD_CLIENTS",
      value: newClients,
    });
  };

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

  return (
    <ClientsContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        clients: state.clients,
        clientInfo: state.clientInfo,
        controlInfo: state.controlInfo,
        addClient,
        eraseClient,
        uploadClients,
        editClient,
        resetClientInfo,
        addClientHistory,
        addClientCredit,
        addCreditHistory,
        uploadControlInfo,
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
