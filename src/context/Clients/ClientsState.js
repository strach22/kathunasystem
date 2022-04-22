import React, { useReducer } from "react";

import PropTypes from "prop-types";

import clients from "../../data/clients.json";
import ClientsContext from "./ClientsContext";

function reducer(state, action) {
  switch (action.type) {
    case "GET_CLIENTS": {
      return { ...state, clients: action.value };
    }
    case "ERASE_CLIENT": {
      return { ...state, clients: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function ClientsState({ children }) {
  const initialstate = {
    clients,
  };

  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useReducer(reducer, initialstate);

  const getClients = () => {
    dispatch({
      type: "GET_CLIENTS",
      value: [
        { id: 1, firstName: "Isaac" },
        { id: 2, firstName: "Sebastian" },
      ],
    });
    // eslint-disable-next-line no-console
    console.log(state);
  };

  const eraseClient = (id) => {
    const newClients = state.clients.filter((client) => client.id !== id);
    dispatch({
      type: "ERASE_CLIENT",
      value: newClients,
    });
  };

  return (
    <ClientsContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        clients: state.clients,
        getClients,
        eraseClient,
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
