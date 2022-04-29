/* eslint-disable react/prop-types */
import { useContext } from "react";

import { useParams } from "react-router-dom";
// Soft UI Dashboard React components
import ClientsContext from "../../../context/Clients/ClientsContext";

export default function data() {
  const { clients } = useContext(ClientsContext);
  const { id } = useParams();
  const i = clients.map((e) => e.id).indexOf(id);

  return {
    columns: [
      { Header: "Fecha", accessor: "transactionDate", align: "left" },
      { Header: "Valor", accessor: "value", align: "left" },
      { Header: "Balance Actual", accessor: "actualBalance", align: "left" },
      { Header: "Observación", accessor: "observation", align: "center" },
    ],

    rows: clients[i].savingHistory.map((info) => ({
      transactionDate: info.transactionDate,
      value: info.value,
      actualBalance: info.actualBalance,
      observation: info.observation,
    })),
  };
}
