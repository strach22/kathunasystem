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
  const { clients, eraseClient, editClient } = useContext(ClientsContext);
  const i = clients.map((e) => e.id).indexOf(parseInt(id, 10));
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={10}>
            <MDBox coloredShadow="secondary">
              <MDTypography padding={2} variant="h4" sx={{ textAlign: "center" }}>
                Cliente # {id}
              </MDTypography>
              <Grid container spacing={2} paddingLeft={3} paddingBottom={2}>
                <Grid item xs={5.7}>
                  <MDTypography variant="h5">Nombres:</MDTypography>
                  <MDTypography variant="h5">Apellidos:</MDTypography>
                  <MDTypography variant="h5">Documento de Identidad:</MDTypography>
                  <MDTypography variant="h5">Fecha de Nacimiento:</MDTypography>
                  <MDTypography variant="h5">Teléfono:</MDTypography>
                  <MDTypography variant="h5">Correo Electrónico:</MDTypography>
                  <MDTypography variant="h5">Estado Civil:</MDTypography>
                  <MDTypography variant="h5">Fecha de Afiliación:</MDTypography>
                  <MDTypography variant="h5">Tarifa:</MDTypography>
                  <MDTypography variant="h5">Saldo de Ahorros:</MDTypography>
                  <MDTypography variant="h5">Saldo de Crédito:</MDTypography>
                  <MDTypography variant="h5">Dirección:</MDTypography>
                </Grid>
                <Grid item xs={6}>
                  <MDTypography fontWeight="regular" variant="h5">
                    {clients[i].firstName}
                  </MDTypography>
                  <MDTypography fontWeight="regular" variant="h5">
                    {clients[i].lastName}
                  </MDTypography>
                  <MDTypography fontWeight="regular" variant="h5">
                    {clients[i].identification}
                  </MDTypography>
                  <MDTypography fontWeight="regular" variant="h5">
                    {clients[i].birthDate}
                  </MDTypography>
                  <MDTypography fontWeight="regular" variant="h5">
                    {clients[i].mobile}
                  </MDTypography>
                  <MDTypography fontWeight="regular" variant="h5">
                    {clients[i].email}
                  </MDTypography>
                  <MDTypography fontWeight="regular" variant="h5">
                    {clients[i].civil}
                  </MDTypography>
                  <MDTypography fontWeight="regular" variant="h5">
                    {clients[i].creationDate}
                  </MDTypography>
                  <MDTypography fontWeight="regular" variant="h5">
                    {clients[i].tariff}
                  </MDTypography>
                  <MDTypography fontWeight="regular" variant="h5">
                    {clients[i].saldoAhorros}
                  </MDTypography>
                  <MDTypography fontWeight="regular" variant="h5">
                    {clients[i].saldoCredito}
                  </MDTypography>
                  <MDTypography fontWeight="regular" variant="h5">
                    {clients[i].address}
                  </MDTypography>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
          <Grid item xs={12} lg={11}>
            <MDButton color="secondary" sx={{ marginLeft: 2 }} component={Link} to="/clientes">
              REGRESAR
            </MDButton>
            <MDButton
              color="info"
              sx={{ marginLeft: 2 }}
              component={Link}
              to="/agregar-clientes"
              onClick={() => editClient(clients[i])}
            >
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
