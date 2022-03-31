import React from "react";
import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

export default function PrincipalScreen() {
  return (
    <form>
      <MDBox pt={6} pb={3}>
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
                  Agregar Clientes
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <h1>Otra vez</h1>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </form>
  );
}
