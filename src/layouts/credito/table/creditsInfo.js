/* eslint-disable react/prop-types */
import { useContext } from "react";

import { useParams, Link } from "react-router-dom";

// Soft UI Dashboard React components
import MDTypography from "components/MDTypography";

import ClientsContext from "context/Clients/ClientsContext";
import DownloadAmortization from "../download/DownloadAmortization";
import DownloadChange from "../download/DownloadChange";

export default function data() {
  const { clients } = useContext(ClientsContext);
  const { id } = useParams();
  const i = clients.map((e) => e.id).indexOf(id);

  return {
    columns: [
      { Header: "Carpeta", accessor: "id", align: "left" },
      { Header: "Valor Préstamo", accessor: "loanValue", align: "center" },
      { Header: "Deuda Pendiente", accessor: "actualLoan", align: "center" },
      { Header: "Cuotas", accessor: "periods", align: "center" },
      { Header: "Valor a Pagar Mensaul", accessor: "monthlyPayment", align: "center" },
      { Header: "Estado", accessor: "state", align: "center" },
      { Header: "Tabla de Amortización", accessor: "downloadAmortization", align: "center" },
      { Header: "Letra de Cambio", accessor: "downloadChange", align: "center" },
      { Header: "acción", accessor: "accion", align: "center" },
    ],

    rows: clients[i].credits.map((info) => ({
      id: info.id,
      loanValue: info.loanValue,
      actualLoan: info.actualLoan,
      periods: info.periods,
      monthlyPayment: info.monthlyPayment,
      state: info.state,
      downloadAmortization: <DownloadAmortization info={info} />,
      downloadChange: <DownloadChange info={info} />,
      accion: (
        <Link to={`/carpeta/${id}-${info.id}`}>
          <MDTypography variant="caption" color="info" fontWeight="medium">
            Ver/Pagar Carpeta
          </MDTypography>
        </Link>
      ),
    })),
  };
}
