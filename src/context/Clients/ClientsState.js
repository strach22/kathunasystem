import React, { useReducer } from "react";

import PropTypes from "prop-types";

import clients from "../../data/clients.json";
import ClientsContext from "./ClientsContext";

function reducer(state, action) {
  switch (action.type) {
    case "UPLOAD_CLIENTS":
      return { ...state, clients: action.value };

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
    clients,
    clientInfo: null,
  };

  const [state, dispatch] = useReducer(reducer, initialstate);

  const addClient = (newClient) => {
    const newClients = state.clients;
    const i = state.clients.map((e) => e.id).indexOf(newClient.id);
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

  const eraseClient = (id) => {
    const newClients = state.clients.filter((client) => client.id !== id);
    dispatch({
      type: "UPLOAD_CLIENTS",
      value: newClients,
    });
  };

  const addClientHistory = (id, data) => {
    const i = state.clients.map((e) => e.id).indexOf(id);
    const newClients = state.clients;
    newClients[i].savingHistory.push(data);
    newClients[i].savingBalance = data.actualBalance;
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
        addClient,
        eraseClient,
        uploadClients,
        editClient,
        resetClientInfo,
        addClientHistory,
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
