import React, { useReducer } from "react";

import PropTypes from "prop-types";

import clients from "../../data/clients.json";
import ClientsContext from "./ClientsContext";

function reducer(state, action) {
  switch (action.type) {
    case "GET_CLIENTS": {
      return { ...state, clients: action.value };
    }
    case "GET_PROFILE": {
      return { ...state, selectedClient: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function ClientsState({ children }) {
  const initialstate = {
    clients,
    selectedClient: null,
  };

  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useReducer(reducer, initialstate);

  const getClients = () => {
    dispatch({
      type: "GET_CLIENTS",
      value: [{ firstName: "Isaac" }, { firstName: "Sebastian" }],
    });
    // eslint-disable-next-line no-console
    console.log("Hola");
  };

  const getProfile = () => {
    dispatch({
      type: "GET_PROFILE",
      value: "Usuario 1",
    });
  };

  return (
    <ClientsContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        clients: state.clients,
        selectedClient: state.selectedClient,
        getClients,
        getProfile,
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
