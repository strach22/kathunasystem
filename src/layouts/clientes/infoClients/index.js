import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
// @mui material components
import Grid from "@mui/material/Grid";
import MDButton from "components/MDButton";
import { Divider } from "@mui/material";

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
  console.log(clients);
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
              {getInfo("Nombres:", clients[i].firstName)}
              {getInfo("Apellidos:", clients[i].lastName)}
              {getInfo("Documento de Identidad:", clients[i].identification)}
              {getInfo("Teléfono:", clients[i].mobile)}
              {getInfo("2do Teléfono:", clients[i].secondMobile)}
              {getInfo("Tarifa:", clients[i].tariff)}
              {getInfo("Estado Civil:", clients[i].civil)}
              {getInfo("Fecha de Nacimiento:", clients[i].birthDate)}
              {getInfo("Fecha de Afiliación:", clients[i].creationDate)}
              {getInfo("Dirección:", clients[i].address)}
              {getInfo("Correo Electrónico:", clients[i].email)}
              <Divider />
              {getInfo("Nombres del Conyugue:", clients[i].firstNameSpouse)}
              {getInfo("Apellidos del Conyugue:", clients[i].lastNameSpouse)}
              {getInfo("Documento Id del Conyugue:", clients[i].identificationSpouse)}
              {getInfo("Teléfono del Conyugue:", clients[i].mobileSpouse)}
              <Divider />
              {getInfo("Nombres del Pariente:", clients[i].firstNameRelationShip)}
              {getInfo("Apellidos del Pariente:", clients[i].lastNameRelationShip)}
              {getInfo("Teléfono del Pariente:", clients[i].mobileRelationShip)}
              {getInfo("Parentesco:", clients[i].relationShip)}
              <Divider />
              {getInfo("Saldo de Ahorros:", clients[i].savingBalance)}
              {getInfo("Saldo de Crédito:", clients[i].creditBalance)}
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
