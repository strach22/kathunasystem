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
  clients.forEach((client) => {
    if (client.savingHistory.length > 0) {
      const date = new Date(client.savingHistory[client.savingHistory.length - 1].transactionDate);
      if (new Date() >= date.setMonth(date.getMonth() + 1)) {
        client.savingHistory.push({
          transactionDate: new Date().toLocaleDateString().split("/").reverse().join("/"),
          value:
            client.tariff === "Particular"
              ? client.savingBalance * controlInfo.particularSavingInterest
              : client.savingBalance * controlInfo.partnerSavingInterest,
          actualBalance:
            client.tariff === "Particular"
              ? client.savingBalance * (controlInfo.particularSavingInterest + 1)
              : client.savingBalance * (controlInfo.partnerSavingInterest + 1),
          paymentType: "Transferencia",
          observation: "Intereses por ahorros",
          receipt: 100,
        });
      }
    }
  });
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

  const updateClients = (newClients) => {
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

  const editSystemData = (data) => {
    dispatch({
      type: "UPDATE_SYSTEM_DATA",
      value: data,
    });
  };

  const sbNotification = (info) => {
    const newSystemData = state.systemData;
    newSystemData.SBstate = true;
    newSystemData.SBinfo = info;
    dispatch({
      type: "UPDATE_SYSTEM_DATA",
      value: newSystemData,
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
        editClient,
        resetClientInfo,
        addClientHistory,
        updateClients,
        addClientCredit,
        uploadControlInfo,
        editSystemData,
        sbNotification,
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
