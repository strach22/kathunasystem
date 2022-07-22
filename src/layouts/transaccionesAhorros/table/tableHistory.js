/* eslint-disable react/prop-types */
import { useContext, useMemo } from "react";

import { useParams } from "react-router-dom";
// Soft UI Dashboard React components
import ClientsContext from "../../../context/Clients/ClientsContext";
import ProofPaymentTransaction from "../download/ProofPaymentTransaction";

export default function data() {
  const { clients } = useContext(ClientsContext);
  const id = useMemo(() => useParams().id, []);
  const i = clients.map((e) => e.id).indexOf(id);

  return {
    columns: [
      { Header: "Comprobante", accessor: "receipt", align: "left" },
      { Header: "Fecha", accessor: "transactionDate", align: "center" },
      { Header: "Valor", accessor: "transactionValue", align: "center" },
      { Header: "Balance Actual", accessor: "actualBalance", align: "center" },
      { Header: "Tipo de Pago", accessor: "paymentType", align: "center" },
      { Header: "Observación", accessor: "observation", align: "left" },
      { Header: "Comprobante PDF", accessor: "download", align: "center" },
    ],

    rows: clients[i].savingHistory.map((info) => ({
      receipt: info.receipt,
      transactionDate: info.transactionDate,
      transactionValue: `$ ${info.value}`,
      actualBalance: `$ ${info.actualBalance.toFixed(2)}`,
      paymentType: info.paymentType,
      observation: info.observation,
      download: <ProofPaymentTransaction info={info} i={i} />,
    })),
  };
}
