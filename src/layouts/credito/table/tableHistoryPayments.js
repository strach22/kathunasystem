/* eslint-disable react/prop-types */
import { useContext } from "react";

import { useParams } from "react-router-dom";
// Soft UI Dashboard React components
import ClientsContext from "../../../context/Clients/ClientsContext";
import IndividualProofPayment from "../download/IndividualProofPayment";

export default function data() {
  const { clients } = useContext(ClientsContext);
  const { id } = useParams();
  const [idC, idF] = id.split("-");

  const i = clients.map((e) => e.id).indexOf(idC);
  const i2 = clients[i].credits.map((e) => e.id).indexOf(idF);

  return {
    columns: [
      { Header: "id", accessor: "id", align: "left" },
      { Header: "Fecha", accessor: "transactionDate", align: "left" },
      { Header: "Valor", accessor: "value", align: "center" },
      { Header: "Tipo de Pago", accessor: "paymentType", align: "center" },
      { Header: "Observación", accessor: "observation", align: "left" },
      { Header: "Comprobante PDF", accessor: "download", align: "center" },
    ],

    rows: clients[i].credits[i2].creditHistory.map((info) => ({
      id: info.id,
      transactionDate: info.transactionDate,
      value: info.value,
      paymentType: info.paymentType,
      observation: info.observation,
      download: <IndividualProofPayment info={info} />,
    })),
  };
}
