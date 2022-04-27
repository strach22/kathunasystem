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
  const i = clients.map((e) => e.id).indexOf(id);

  const categories = [
    "Nombres:",
    "Apellidos:",
    "Documento de Identidad:",
    "Teléfono:",
    "2do Teléfono:",
    "Tarifa:",
    "Estado Civil:",
    "Fecha de Nacimiento:",
    "Fecha de Afiliación:",
    "Dirección:",
    "Correo Electrónico:",
    "Nombres del Conyugue",
    "Apellidos del Conyugue",
    "Documento Id del Conyugue",
    "Teléfono del Conyugue",
    "Nombres del Pariente",
    "Apellidos del Pariente",
    "Teléfono del Pariente",
    "Parentesco ",
    "Saldo de Ahorros:",
    "Saldo de Crédito:",
  ];
  const getInfo = (category, info) => (
    <Grid container paddingLeft={3}>
      <Grid item xs={5.7}>
        <MDTypography variant="h5">{category}</MDTypography>
      </Grid>
      <Grid item xs={6}>
        <MDTypography fontWeight="regular" variant="h5">
          {info}
        </MDTypography>
      </Grid>
    </Grid>
  );
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <MDBox coloredShadow="secondary" pb={2}>
              <MDTypography padding={2} variant="h4" sx={{ textAlign: "center" }}>
                Cliente # {id}
              </MDTypography>
              {getInfo(categories[0], clients[i].firstName)}
              {getInfo(categories[1], clients[i].lastName)}
              {getInfo(categories[2], clients[i].identification)}
              {getInfo(categories[4], clients[i].mobile)}
              {getInfo(categories[5], clients[i].secondMobile)}
              {getInfo(categories[6], clients[i].tariff)}
              {getInfo(categories[7], clients[i].civil)}
              {getInfo(categories[3], clients[i].birthDate)}
              {getInfo(categories[8], clients[i].creationDate)}
              {getInfo(categories[9], clients[i].address)}
              {getInfo(categories[10], clients[i].email)}
              {getInfo(categories[11], clients[i].firstNameSpouse)}
              {getInfo(categories[12], clients[i].lastNameSpouse)}
              {getInfo(categories[13], clients[i].identificationSpouse)}
              {getInfo(categories[14], clients[i].mobileSpouse)}
              {getInfo(categories[15], clients[i].firstNameRelationShip)}
              {getInfo(categories[16], clients[i].lastNameRelationShip)}
              {getInfo(categories[17], clients[i].mobileRelationShip)}
              {getInfo(categories[18], clients[i].relationShip)}
              {getInfo(categories[19], clients[i].savingBalance)}
              {getInfo(categories[20], clients[i].creditBalance)}
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
              onClick={() => eraseClient(id)}
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
