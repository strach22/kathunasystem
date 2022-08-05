import { useContext, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// @mui material components
import Grid from "@mui/material/Grid";
import MDButton from "components/MDButton";
import { Card, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

import ClientsContext from "../../../context/Clients/ClientsContext";
import historial from "../../transaccionesAhorros/table/tableHistory";

const useStyles = makeStyles({
  root: {
    "& .css-1f19gdh": {
      margin: "0px 40px 40px 40px",
    },
    "& .MuiButton-sizeLarge": {
      width: "90%",
      margin: "0px 0px 10px 40px",
    },
  },
});

function infoClients() {
  const classes = useStyles();
  const { clients, editClient } = useContext(ClientsContext);
  const id = useMemo(() => useParams().id, []);
  const navigate = useNavigate();

  const i = clients.map((e) => e.id).indexOf(id);
  const { columns, rows } = historial();

  const getInfo = (category, info) => (
    <Grid container paddingLeft={3}>
      <Grid item xs={12} md={5.7}>
        <MDTypography variant="h5">{category}</MDTypography>
      </Grid>
      <Grid item xs={12} md={6}>
        <MDTypography fontWeight="regular" variant="h6" color="text">
          {info}
        </MDTypography>
      </Grid>
    </Grid>
  );

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3} mx={3}>
        <Grid container spacing={10} className={classes.root}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h5" color="white">
                  Información del Cliente {id}
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <Grid item xs={12}>
                  <MDBox coloredShadow="secondary">
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
                    {clients[i].identificationSpouse && (
                      <>
                        {getInfo("Nombres del Conyugue:", clients[i].firstNameSpouse)}
                        {getInfo("Apellidos del Conyugue:", clients[i].lastNameSpouse)}
                        {getInfo(
                          "Documento de  Identidad del Conyugue:",
                          clients[i].identificationSpouse
                        )}
                        {getInfo("Teléfono del Conyugue:", clients[i].mobileSpouse)}
                        <Divider />
                      </>
                    )}
                    {getInfo("Parentesco:", clients[i].relationShip)}
                    {getInfo("Nombres del Pariente:", clients[i].firstNameRelationShip)}
                    {getInfo("Apellidos del Pariente:", clients[i].lastNameRelationShip)}
                    {getInfo("Teléfono del Pariente:", clients[i].mobileRelationShip)}
                    {getInfo(
                      "Documento de Identidad del Pariente:",
                      clients[i].identificationRelationShip
                    )}
                    <Divider />
                    {getInfo("Saldo de Ahorros:", clients[i].savingBalance)}
                    {getInfo("Saldo de Crédito:", clients[i].creditBalance)}
                  </MDBox>
                </Grid>
              </MDBox>
              <Grid container mb={2}>
                <Grid item xs={10} sm={4} md={3}>
                  <MDButton
                    size="large"
                    variant="text"
                    onClick={handleReturn}
                    sx={{ background: "#7B809A", "&:hover": { background: "#99A3A4" } }}
                  >
                    REGRESAR
                  </MDButton>
                </Grid>
                <Grid item xs={10} sm={4} md={3}>
                  <MDButton
                    variant="text"
                    size="large"
                    component={Link}
                    to="/agregar-clientes"
                    sx={{ background: "#1A73E8", "&:hover": { background: "#5499C7" } }}
                    onClick={() => editClient(clients[i])}
                  >
                    EDITAR
                  </MDButton>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          {clients[i].savingHistory.length && (
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h5" color="white">
                    Historial Estado de Cuenta Ahorros
                  </MDTypography>
                </MDBox>
                <MDBox coloredShadow="secondary" pt={3} pb={2}>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted
                    showTotalEntries={false}
                    noEndBorder
                    entriesPerPage={false}
                    defaultEntries={5}
                  />
                </MDBox>
              </Card>
            </Grid>
          )}
        </Grid>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default infoClients;
