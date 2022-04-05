/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
// Soft UI Dashboard React components
import MDTypography from "components/MDTypography";
import clients from "../../../data/clients.json";

export default function data() {
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
      id: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {cliente.id}
        </MDTypography>
      ),
      firstName: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {cliente.firstName}
        </MDTypography>
      ),
      lastName: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {cliente.lastName}
        </MDTypography>
      ),
      identification: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {cliente.identification}
        </MDTypography>
      ),
      mobile: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {cliente.mobile}
        </MDTypography>
      ),
      tariff: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {cliente.tariff}
        </MDTypography>
      ),
      accion: (
        <Link to={`${cliente.id}`}>
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            Ver
          </MDTypography>
        </Link>
      ),
    })),
  };
}
