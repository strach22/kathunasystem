// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import PrincipalScreen from "./components/PrincipalScreen";

function gastos() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <PrincipalScreen />
      <Footer />
    </DashboardLayout>
  );
}

export default gastos;
