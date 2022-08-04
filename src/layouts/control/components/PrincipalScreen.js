import React from "react";
import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import InfoControlScreen from "./InfoControlScreen";
import ControlScreen from "./ControlScreen";

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
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h5" color="white">
                Información General
              </MDTypography>
            </MDBox>
            <MDBox pt={4} mx={4} mb={3}>
              <InfoControlScreen />
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
                Control de Variables
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
              <ControlScreen />
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}
