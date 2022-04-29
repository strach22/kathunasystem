/* eslint-disable react/prop-types */
import { useContext } from "react";
// Soft UI Dashboard React components
import ClientsContext from "../../../context/Clients/ClientsContext";

export default function data() {
  const { clients } = useContext(ClientsContext);
  return {
    columns: [
      { Header: "Fecha", accessor: "transactionDate", align: "left" },
      { Header: "Valor", accessor: "value", align: "left" },
      { Header: "Balance Actual", accessor: "actualBalance", align: "left" },
      { Header: "Observación", accessor: "observation", align: "center" },
    ],

    rows: clients[0].savingHistory.map((info) => ({
      transactionDate: info.transactionDate,
      value: info.value,
      actualBalance: info.actualBalance,
      observation: info.observation,
    })),
  };
}
