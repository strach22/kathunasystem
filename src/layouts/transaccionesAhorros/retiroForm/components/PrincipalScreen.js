import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import AccountStatusScreen from "layouts/transaccionesAhorros/helpers/AccountStatusScreen";
import InfoScreen from "layouts/transaccionesAhorros/helpers/InfoScreen";
import React from "react";
import RetiroScreen from "./RetiroScreen";

export default function PrincipalScreen() {
  return (
    <MDBox pt={6} pb={3} mx={4}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              borderRadius="lg"
              coloredShadow="error"
              sx={{ background: "#BC2709" }}
            >
              <MDTypography variant="h5" color="white">
                Datos del cliente
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
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
              borderRadius="lg"
              coloredShadow="error"
              sx={{ background: "#BC2709" }}
            >
              <MDTypography variant="h5" color="white">
                Crear Retiro
              </MDTypography>
            </MDBox>
            <MDBox pt={1} mx={5} mb={3}>
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
              borderRadius="lg"
              coloredShadow="error"
              sx={{ background: "#BC2709" }}
            >
              <MDTypography variant="h5" color="white">
                Historial de Estado de Cuenta
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
              <AccountStatusScreen />
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}
