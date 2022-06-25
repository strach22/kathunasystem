import { Link } from "react-router-dom";
// Soft UI Dashboard React components
import MDTypography from "components/MDTypography";

export default function data(clients) {
  return {
    columns: [
      { Header: "código", accessor: "id", align: "left", width: "15%" },
      { Header: "nombres", accessor: "firstName", align: "left" },
      { Header: "apellidos", accessor: "lastName", align: "left" },
      { Header: "documento", accessor: "identification", align: "center" },
      { Header: "saldo", accessor: "creditBalance", align: "center" },
      { Header: "acción", accessor: "accion", align: "center" },
    ],

    rows: clients.map((cliente) => ({
      id: cliente.id,
      firstName: cliente.firstName,
      lastName: cliente.lastName,
      identification: cliente.identification,
      creditBalance: `$ ${cliente.creditBalance.toFixed(2)}`,
      accion: (
        <>
          <Link to={`crear/${cliente.id}`}>
            <MDTypography variant="caption" color="success" fontWeight="medium">
              Crear Crédito
            </MDTypography>
          </Link>
          <br />
          <Link to={`ver/${cliente.id}`}>
            <MDTypography variant="caption" color="info" fontWeight="medium">
              Ver/Pagar Créditos
            </MDTypography>
          </Link>
        </>
      ),
    })),
  };
}
