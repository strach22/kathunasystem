// @mui material components

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Import components
import UserList from "../../components/UserList";

function Simulador() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <UserList />
      <Footer />
    </DashboardLayout>
  );
}

export default Simulador;
