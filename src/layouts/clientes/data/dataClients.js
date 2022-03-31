/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
// Soft UI Dashboard React components
import MDTypography from "components/MDTypography";
import clients from "./clients.json";

export default function data() {
  return {
    columns: [
      { Header: "código", accessor: "id", align: "left" },
      { Header: "nombres", accessor: "nombres", align: "left" },
      { Header: "apellidos", accessor: "apellidos", align: "left" },
      { Header: "documento", accessor: "documento", align: "center" },
      { Header: "teléfono", accessor: "telefono", align: "center" },
      { Header: "tarifa", accessor: "tariff", align: "center" },
      { Header: "acción", accessor: "accion", align: "center" },
    ],

    rows: clients.map((cliente) => ({
      id: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {cliente.id}
        </MDTypography>
      ),
      nombres: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {cliente.nombres}
        </MDTypography>
      ),
      apellidos: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {cliente.apellidos}
        </MDTypography>
      ),
      documento: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {cliente.documento}
        </MDTypography>
      ),
      telefono: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {cliente.telefono}
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
