import { useContext } from "react";
import { useParams } from "react-router-dom";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import ClientsContext from "context/Clients/ClientsContext";

function verCarpeta() {
  const { clients } = useContext(ClientsContext);
  const { id } = useParams();
  const [idC, idF] = id.split("-");
  const i = clients.map((e) => e.id).indexOf(idC);
  const [folderInfo] = clients[i].credits.filter((folder) => folder.id === idF);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      Cliente: {clients[i].firstName}
      <br />
      Deuda Total: {folderInfo.loanValue}
      <Footer />
    </DashboardLayout>
  );
}

export default verCarpeta;
