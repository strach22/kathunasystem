/* eslint-disable no-use-before-define */
import { useContext } from "react";
import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import FormScreen from "./FormScreen";

import ClientsContext from "../../../../context/Clients/ClientsContext";

export default function PrincipalScreen() {
  const { clientInfo } = useContext(ClientsContext);
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
                {clientInfo ? "Editar Cliente" : "Agregar Cliente"}
              </MDTypography>
            </MDBox>
            <MDBox py={3} mx={2}>
              <FormScreen />
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}
