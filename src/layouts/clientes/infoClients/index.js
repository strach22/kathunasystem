import { useContext } from "react";
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

import ClientsContext from "../../../context/Clients/ClientsContext";

function infoClients() {
  const { id } = useParams();
  const { clients, eraseClient } = useContext(ClientsContext);
  const i = clients.map((e) => e.id).indexOf(parseInt(id, 10));
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <MDBox coloredShadow="secondary">
              <MDTypography padding={2} variant="h4" sx={{ textAlign: "center" }}>
                Cliente # {id}
              </MDTypography>
              <MDTypography variant="h5" paddingLeft={2} paddingBottom={2}>
                Nombres: {clients[i].firstName}
                <br />
                Apellidos: {clients[i].lastName}
                <br />
                Documento de Identidad: {clients[i].identification}
                <br />
                Fecha de Nacimiento: {clients[i].birthDate}
                <br />
                Teléfono: {clients[i].mobile}
                <br />
                Dirección: {clients[i].address}
                <br />
                Correo Electrónico: {clients[i].email}
                <br />
                Estado Civil: {clients[i].civil}
                <br />
                Fecha de Afiliación: {clients[i].creationDate}
                <br />
                Tarifa: {clients[i].tariff}
                <br />
                Saldo de Ahorros: {clients[i].saldoAhorros}
                <br />
                Saldo de Crédito: {clients[i].saldoCredito}
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} lg={11}>
            <MDButton color="secondary" sx={{ marginLeft: 2 }} component={Link} to="/clientes">
              REGRESAR
            </MDButton>
            <MDButton color="info" sx={{ marginLeft: 2 }}>
              EDITAR
            </MDButton>
            <MDButton
              color="error"
              sx={{ marginLeft: 2 }}
              component={Link}
              to="/clientes"
              onClick={() => eraseClient(parseInt(id, 10))}
            >
              ELIMINAR
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default infoClients;
