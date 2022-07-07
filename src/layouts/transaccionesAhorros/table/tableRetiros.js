import { useContext } from "react";
import { Link } from "react-router-dom";
// Soft UI Dashboard React components
import MDTypography from "components/MDTypography";
import ClientsContext from "../../../context/Clients/ClientsContext";

export default function data() {
  const { clients } = useContext(ClientsContext);
  return {
    columns: [
      { Header: "código", accessor: "id", align: "left", width: "15%" },
      { Header: "nombres", accessor: "firstName", align: "left" },
      { Header: "apellidos", accessor: "lastName", align: "left" },
      { Header: "documento", accessor: "identification", align: "center" },
      { Header: "saldo", accessor: "savingBalance", align: "center" },
      { Header: "acción", accessor: "accion", align: "center" },
    ],

    rows: clients.map((cliente) => ({
      id: (
        <Link to={`/clientes/${cliente.id}`}>
          <MDTypography variant="caption" color="info" fontWeight="medium">
            {cliente.id}
          </MDTypography>
        </Link>
      ),
      firstName: cliente.firstName,
      lastName: cliente.lastName,
      identification: cliente.identification,
      savingBalance: `$ ${cliente.savingBalance.toFixed(2)}`,
      accion: (
        <>
          <Link to={`/depositos/${cliente.id}`}>
            <MDTypography variant="caption" color="info" fontWeight="medium">
              Deposito
            </MDTypography>
          </Link>
          <br />
          <Link to={`/retiros/${cliente.id}`}>
            <MDTypography variant="caption" color="error" fontWeight="medium">
              Retiro
            </MDTypography>
          </Link>
        </>
      ),
    })),
  };
}
