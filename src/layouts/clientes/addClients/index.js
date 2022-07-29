// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import FormScreen from "./components/FormScreen";

function Tables() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <FormScreen />
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
