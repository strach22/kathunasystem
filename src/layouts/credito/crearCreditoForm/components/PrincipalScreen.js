import MDBox from "components/MDBox";
import { Card, Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import InfoScreen from "layouts/credito/helpers/InfoScreen";
import Credit from "./Credit";

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
                Datos del cliente
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
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
                Crear Crédito
              </MDTypography>
            </MDBox>
            <MDBox pt={1} mx={5} mb={3}>
              <Credit />
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}
