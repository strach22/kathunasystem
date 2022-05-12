import React, { useState } from "react";
import { Card, Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import { makeStyles } from "@mui/styles";
import CreditSimulatorScreen from "./CreditSimulatorScreen";
import PaymentHistory from "./PaymentHistory";

const useStyles = makeStyles({
  root: {
    "& .css-1f19gdh": {
      margin: "30px",
      padding: "24px",
    },
  },
});

export default function PrincipalScreen() {
  const [parameters, setParameters] = useState({});
  const classes = useStyles();
  return (
    <MDBox pt={6} pb={3} mx={15}>
      <Grid container spacing={6} className={classes.root}>
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
            <MDBox pt={3}>
              <CreditSimulatorScreen setParameters={setParameters} />
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
                Tabla de Amortización
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
              <PaymentHistory parameters={parameters} />
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}
