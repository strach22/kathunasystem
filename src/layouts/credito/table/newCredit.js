/* eslint-disable react/prop-types */
import { useContext } from "react";

import { useParams } from "react-router-dom";
// Soft UI Dashboard React components
import ClientsContext from "context/Clients/ClientsContext";

export default function data() {
  const { clients } = useContext(ClientsContext);
  const { id } = useParams();
  const i = clients.map((e) => e.id).indexOf(id);

  return {
    columns: [
      { Header: "Carpeta", accessor: "id", align: "left" },
      { Header: "Valor Préstamo", accessor: "loanValue", align: "center" },
      { Header: "Cuota", accessor: "periods", align: "center" },
      { Header: "Valor a Pagar Mensaul", accessor: "monthlyPayment", align: "center" },
      { Header: "Interés", accessor: "interest", align: "center" },
      { Header: "Deuda Pendiente", accessor: "actualLoan", align: "center" },
      { Header: "Estado", accessor: "state", align: "center" },
    ],

    rows: clients[i].credits.map((info) => ({
      id: info.id,
      loanValue: info.loanValue,
      periods: info.periods,
      monthlyPayment: info.monthlyPayment,
      interest: info.interest,
      actualLoan: info.actualLoan,
      state: info.state,
    })),
  };
}
