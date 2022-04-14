import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React from "react";
import AccountStatusScreen from "./AccountStatusScreen";
import InfoScreen from "./InfoScreen";
import RetiroScreen from "./RetiroScreen";

export default function PrincipalScreen() {
  return (
    <MDBox pt={6} pb={3} mx={15}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="error"
              borderRadius="lg"
              coloredShadow="error"
            >
              <MDTypography variant="h5" color="white">
                Datos del cliente
              </MDTypography>
            </MDBox>
            <MDBox pt={3} sx={{ margin: "30px", padding: "24px" }}>
              <InfoScreen />
            </MDBox>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="error"
              borderRadius="lg"
              coloredShadow="error"
            >
              <MDTypography variant="h5" color="white">
                Crear Retiro
              </MDTypography>
            </MDBox>
            <MDBox pt={3} sx={{ margin: "30px", padding: "24px" }}>
              <RetiroScreen />
            </MDBox>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="error"
              borderRadius="lg"
              coloredShadow="error"
            >
              <MDTypography variant="h5" color="white">
                Historial de Estado de Cuenta
              </MDTypography>
            </MDBox>
            <MDBox pt={3} sx={{ margin: "30px", padding: "24px" }}>
              <AccountStatusScreen />
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}

// const { id } = useParams();
//   const navigate = useNavigate();

//   const retirar = () => {
//     clients[id - 1].saldoAhorros -= 10;
//     navigate("/inicio");
//   };

/* <MDBox mt={6} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <MDBox coloredShadow="secondary">
              <MDTypography padding={2} variant="h4">
                Cliente # {id}
              </MDTypography>
              <MDTypography variant="h5" paddingLeft={2} paddingBottom={2}>
                Nombres: {clients[id - 1].firstName}
                <br />
                Apellidos: {clients[id - 1].lastName}
                <br />
                Documento de Identidad: {clients[id - 1].identification}
                <br />
                Teléfono: {clients[id - 1].mobile}
                <br />
                Saldo de Ahorros: {clients[id - 1].saldoAhorros}
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} lg={11}>
            <Link to="/retiros">
              <MDButton color="secondary" sx={{ marginLeft: 2 }}>
                REGRESAR
              </MDButton>
            </Link>
            <MDButton color="info" onClick={retirar} sx={{ marginLeft: 2 }}>
              RETIRAR
            </MDButton>
            <MDButton color="error" sx={{ marginLeft: 2 }}>
              ELIMINAR
            </MDButton>
          </Grid>
        </Grid>
      </MDBox> */
