import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MDTypography from "components/MDTypography";
import ClientsContext from "context/Clients/ClientsContext";

export default function tableCreditApproval() {
  const { clients } = useContext(ClientsContext);

  const clientsCredits = clients.filter((val) => val.credits.length);

  return {
    columns: [
      { Header: "código", accessor: "id", align: "left", width: "15%" },
      { Header: "nombres", accessor: "firstName", align: "left" },
      { Header: "apellidos", accessor: "lastName", align: "left" },
      { Header: "documento", accessor: "identification", align: "center" },
      { Header: "acción", accessor: "accion", align: "center" },
    ],

    rows: clientsCredits.map((cliente) => ({
      id: cliente.id,
      firstName: cliente.firstName,
      lastName: cliente.lastName,
      identification: cliente.identification,
      accion: (
        <Link to={`${cliente.id}`}>
          <MDTypography variant="caption" color="info" fontWeight="medium">
            Aprobar Crédito
          </MDTypography>
        </Link>
      ),
    })),
  };
}
