/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Link } from "react-router-dom";
// Soft UI Dashboard React components
import MDTypography from "components/MDTypography";
import ClientsContext from "../../../context/Clients/ClientsContext";

export default function data() {
  const { clients } = useContext(ClientsContext);
  return {
    columns: [
      { Header: "código", accessor: "id", align: "left" },
      { Header: "nombres", accessor: "firstName", align: "left" },
      { Header: "apellidos", accessor: "lastName", align: "left" },
      { Header: "documento", accessor: "identification", align: "center" },
      { Header: "teléfono", accessor: "mobile", align: "center" },
      { Header: "tarifa", accessor: "tariff", align: "center" },
      { Header: "acción", accessor: "accion", align: "center" },
    ],

    rows: clients.map((cliente) => ({
      id: cliente.id,
      firstName: cliente.firstName,
      lastName: cliente.lastName,
      identification: cliente.identification,
      mobile: cliente.mobile,
      tariff: cliente.tariff,
      accion: (
        <Link to={`${cliente.id}`}>
          <MDTypography variant="caption" color="info" fontWeight="medium">
            Pagar crédito
          </MDTypography>
        </Link>
      ),
    })),
  };
}
