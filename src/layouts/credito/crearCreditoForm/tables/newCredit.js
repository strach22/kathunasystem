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
      { Header: "Cuota", accessor: "periods", align: "center" },
      { Header: "Valor Préstamo", accessor: "loanValue", align: "left" },
      { Header: "Deuda Pendiente", accessor: "actualLoan", align: "left" },
      { Header: "Estado", accessor: "state", align: "left" },
    ],

    rows: clients[i].credits.map((info) => ({
      id: info.id,
      periods: info.periods,
      loanValue: info.loanValue,
      actualLoan: info.actualLoan,
      state: info.state,
    })),
  };
}
