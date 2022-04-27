import React from "react";
import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import SavingHistoryScreen from "./SavingHistoryScreen";
import InfoScreen from "./InfoScreen";

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
                Cargar Historial de Ahorros
              </MDTypography>
            </MDBox>
            <MDBox pt={3} sx={{ margin: "30px", padding: "24px" }}>
              <SavingHistoryScreen />
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}
