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

  const folderInfo = clients.filter((client) => client.credits.includes(id));
  console.log(folderInfo);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {folderInfo.loanValue}
      <Footer />
    </DashboardLayout>
  );
}

export default verCarpeta;
