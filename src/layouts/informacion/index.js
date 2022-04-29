// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function informacion() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      Información
      <Footer />
    </DashboardLayout>
  );
}

export default informacion;
