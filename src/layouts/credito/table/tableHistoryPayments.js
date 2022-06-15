/* eslint-disable react/prop-types */
import { useContext, useState } from "react";

import { useParams } from "react-router-dom";
// Soft UI Dashboard React components
import ClientsContext from "../../../context/Clients/ClientsContext";
import IndividualProofPayment from "../download/IndividualProofPayment";

export default function data() {
  const [dataTempo, setDataTempo] = useState({
    id: "",
    transactionDate: "",
    value: "",
    paymentType: "",
    observation: "",
  });
  const { clients } = useContext(ClientsContext);
  const { id } = useParams();
  const [idC, idF] = id.split("-");

  const i = clients.map((e) => e.id).indexOf(idC);
  const i2 = clients[i].credits.map((e) => e.id).indexOf(idF);

  const aux1 = parseInt(clients[i].credits[i2].periods, 10);

  for (let iaux = 0; iaux < aux1; iaux += 1) {
    const aux2 = clients[i].credits[i2].creditHistory[iaux];

    if (aux2) {
      setDataTempo({
        id: aux2.id,
        transactionDate: aux2.transactionDate,
        value: aux2.value,
        paymentType: aux2.paymentType,
        observation: aux2.observation,
      });
    } else {
      console.log(dataTempo);
      // const auxInitialMonth = new Date(clients[i].credits[i2].initialDate);
      // const nowDate = new Date().toISOString().split("T")[0].replace("-", "/").replace("-", "/");
      // console.log(auxInitialMonth, nowDate);
      // setDataTempo({
      //   id: iaux + 1,
      //   transactionDate: aux2.transactionDate,
      //   value: aux2.value,
      //   paymentType: aux2.paymentType,
      //   observation: aux2.observation,
      // });
    }

    // dispatch({
    //   type: "CLIENT_DATA",
    //   payload: dataBaseTempo,
    // });
  }

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
