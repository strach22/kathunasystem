import React from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import { Card } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import InfoScreen from "./InfoScreen";
import DepositScreen from "./DepositScreen";
import AccountStatusScreen from "./AccountStatusScreen";

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
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
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
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h5" color="white">
                Crear Depósito
              </MDTypography>
            </MDBox>
            <MDBox pt={3} sx={{ margin: "30px", padding: "24px" }}>
              <DepositScreen />
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
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
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
