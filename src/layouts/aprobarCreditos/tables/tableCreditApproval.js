import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MDTypography from "components/MDTypography";
import ClientsContext from "context/Clients/ClientsContext";

export default function tableCreditApproval() {
  const { clients } = useContext(ClientsContext);

  const clientsCredits = clients.filter((val) => val.credits.length);
  const allCredits = clientsCredits.map((credit) => credit.credits).flat();
  const creditToBeApproved = allCredits.filter(
    (val) => val.state === "Creado" || val.state === "Aprobado" || val.state === "Denegado"
  );
  const folderOfCredits = creditToBeApproved.map((val) => val.id);

  const rows = [];

  for (let i = 0; i < folderOfCredits.length; i += 1) {
    const infoclientsCredits = clientsCredits
      .filter((val) => val.credits.some((credit) => credit.id === folderOfCredits[i]))
      .map((val) => val);

    const rowsTempo = {
      id: infoclientsCredits[0].id,
      folder: folderOfCredits[i],
      firstName: infoclientsCredits[0].firstName,
      lastName: infoclientsCredits[0].lastName,
      identification: infoclientsCredits[0].identification,
      accion: (
        <Link to={`/aprobar-creditos/${infoclientsCredits[0].id}-${folderOfCredits[i]}`}>
          <MDTypography variant="caption" color="info" fontWeight="medium">
            Aprobar Crédito
          </MDTypography>
        </Link>
      ),
    };

    rows.push(rowsTempo);
  }

  return {
    columns: [
      { Header: "codigo", accessor: "id", align: "left", width: "10%" },
      { Header: "carpeta", accessor: "folder", align: "left", width: "13%" },
      { Header: "nombres", accessor: "firstName", align: "left" },
      { Header: "apellidos", accessor: "lastName", align: "left" },
      { Header: "documento", accessor: "identification", align: "center" },
      { Header: "acción", accessor: "accion", align: "center" },
    ],

    rows,
  };
}
