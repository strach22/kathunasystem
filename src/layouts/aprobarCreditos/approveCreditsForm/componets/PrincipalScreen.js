import React from "react";
import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import InfoScreenSecond from "layouts/credito/helpers/InfoScreenSecond";
import ApproveCredits from "./ApproveCredits";

export default function PrincipalScreen() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={0} md={0.4} lg={0.6} xl={0.8}>
        {}
      </Grid>
      <Grid item xs={12} md={11.2} lg={10.8} xl={10.4} pt={6}>
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
              Datos del Cliente
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <InfoScreenSecond />
          </MDBox>
        </Card>
      </Grid>
      <Grid item xs={0} md={0.4} lg={0.6} xl={0.8}>
        {}
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
              Aprobar Créditos
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <ApproveCredits />
          </MDBox>
        </Card>
      </Grid>
    </Grid>
  );
}
