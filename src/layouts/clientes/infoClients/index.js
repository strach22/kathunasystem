import { useParams, Link } from "react-router-dom";
// @mui material components
import Grid from "@mui/material/Grid";
import MDButton from "components/MDButton";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import clients from "../data/clients.json";

function Notifications() {
  const { id } = useParams();
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <MDBox coloredShadow="secondary">
              <MDTypography padding={2} variant="h4">
                Cliente # {id}
              </MDTypography>
              <MDTypography variant="h5" padding={2}>
                Nombres: {clients[id - 1].nombres}
                <br />
                Apellidos: {clients[id - 1].apellidos}
                <br />
                Documento: {clients[id - 1].documento}
                <br />
                Teléfono: {clients[id - 1].telefono}
                <br />
                Direccion: {clients[id - 1].direccion}
                <br />
                Correo Electrónico: {clients[id - 1].correoelectronico}
                <br />
                Tarifa: {clients[id - 1].tariff}
                <br />
                Saldo: {clients[id - 1].saldo}
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} lg={11}>
            <Link to="/clientes">
              <MDButton color="secondary" sx={{ marginLeft: 2 }}>
                REGRESAR
              </MDButton>
            </Link>
            <MDButton color="info" sx={{ marginLeft: 2 }}>
              EDITAR
            </MDButton>
            <MDButton color="error" sx={{ marginLeft: 2 }}>
              ELIMINAR
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Notifications;
