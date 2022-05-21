import React from "react";
import { makeStyles } from "@mui/styles";
import MDBox from "components/MDBox";
import { Card, Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import ControlScreen from "./ControlScreen";
import InfoControlScreen from "./InfoControlScreen";

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
                Información General
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
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
