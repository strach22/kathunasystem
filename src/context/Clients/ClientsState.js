import React, { useReducer } from "react";

import PropTypes from "prop-types";

import clients from "../../data/clients.json";
import ClientsContext from "./ClientsContext";

function reducer(state, action) {
  switch (action.type) {
    case "ADD_CLIENTS":
      return { ...state, clients: action.value };

    case "ERASE_CLIENT":
      return { ...state, clients: action.value };

    case "UPLOAD_CLIENTS":
      return { ...state, clients: action.value };

    case "EDIT_CLIENT":
      return { ...state, clientInfo: action.value };

    case "CLIENT_DATA":
      // return [ ...state, clients: action.value ];
      return [...state, action.payload];

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

  const addClients = (newClient) => {
    const newClients = clients.push(newClient);
    dispatch({
      type: "ADD_CLIENTS",
      value: newClients,
    });
  };
  const uploadClients = (data) => {
    dispatch({
      type: "UPLOAD_CLIENTS",
      value: data,
    });
  };

  const eraseClient = (id) => {
    const newClients = state.clients.filter((client) => client.id !== id);
    dispatch({
      type: "ERASE_CLIENT",
      value: newClients,
    });
  };
  const editClient = (info) => {
    dispatch({
      type: "EDIT_CLIENT",
      value: info,
    });
  };

  return (
    <ClientsContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        clients: state.clients,
        clientInfo: state.clientInfo,
        addClients,
        eraseClient,
        uploadClients,
        editClient,
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
