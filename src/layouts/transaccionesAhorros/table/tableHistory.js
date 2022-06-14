/* eslint-disable react/prop-types */
import { useContext } from "react";

import { useParams } from "react-router-dom";
// Soft UI Dashboard React components
import ClientsContext from "../../../context/Clients/ClientsContext";
import ProofPaymentTransaction from "../download/ProofPaymentTransaction";

export default function data() {
  const { clients } = useContext(ClientsContext);
  const { id } = useParams();
  const i = clients.map((e) => e.id).indexOf(id);

  return {
    columns: [
      { Header: "Fecha", accessor: "transactionDate", align: "left" },
      { Header: "Valor", accessor: "transactionValue", align: "center" },
      { Header: "Balance Actual", accessor: "actualBalance", align: "center" },
      { Header: "Observación", accessor: "observation", align: "left" },
      { Header: "Comprobante PDF", accessor: "download", align: "center" },
    ],

    rows: clients[i].savingHistory.map((info) => ({
      transactionDate: info.transactionDate,
      transactionValue: info.value,
      actualBalance: info.actualBalance,
      observation: info.observation,
      download: <ProofPaymentTransaction info={info} />,
    })),
  };
}
