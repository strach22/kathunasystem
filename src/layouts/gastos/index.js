// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function gastos() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      Gastos
      <Footer />
    </DashboardLayout>
  );
}

export default gastos;
