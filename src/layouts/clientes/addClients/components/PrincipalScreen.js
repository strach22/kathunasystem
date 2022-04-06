import React from "react";
import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import FormScreen from "./FormScreen";
// import ButtonOk from "../elements/ButtonOk";

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
                Agregar Clientes
              </MDTypography>
            </MDBox>
            <MDBox pt={3} sx={{ margin: "30px", padding: "24px" }}>
              <FormScreen />
            </MDBox>
          </Card>
          {/* <MDBox
            mx={25}
            mt={-5}
            py={3}
            // px={12}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            validBoxShadows="xxl"
            coloredShadow="info"
          >
            <ButtonOk type="submit" text="Submit" />
            <ButtonOk text="Reset" color="default" />
          </MDBox> */}
        </Grid>
      </Grid>
    </MDBox>
  );
}
