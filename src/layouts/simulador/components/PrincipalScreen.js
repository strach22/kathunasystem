import React, { useState } from "react";
import { Card, Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import CreditSimulatorScreen from "./CreditSimulatorScreen";
import PaymentHistory from "./PaymentHistory";

export default function PrincipalScreen() {
  const [parameters, setParameters] = useState({});

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
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h5" color="white">
                Simulador de Créditos
              </MDTypography>
            </MDBox>
            <MDBox mx={5} mb={4}>
              <CreditSimulatorScreen setParameters={setParameters} />
            </MDBox>
          </Card>
        </Grid>
        {parameters.periods && (
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
                  Tabla de Amortización
                </MDTypography>
              </MDBox>
              <MDBox pt={3} mx={2.5} mb={4}>
                <PaymentHistory parameters={parameters} />
              </MDBox>
            </Card>
          </Grid>
        )}
      </Grid>
    </MDBox>
  );
}
