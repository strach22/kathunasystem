import React from "react";
import { Card, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MonthlyPaymentHistory from "layouts/credito/verCarpeta/components/MonthlyPaymentHistory";
import InfoScreenSecond from "layouts/credito/helpers/InfoScreenSecond";
import MonthlyPayment from "./MonthlyPayment";

const useStyles = makeStyles({
  root: {
    "& .css-1f19gdh": {
      margin: "30px",
      padding: "24px",
    },
  },
});

export default function PrincipalScreen() {
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
                Datos del cliente
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
              <InfoScreenSecond />
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
                Pago Mensual de Cuota
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
              <MonthlyPayment />
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
                Historial de las Cuotas
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
              <MonthlyPaymentHistory />
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}
