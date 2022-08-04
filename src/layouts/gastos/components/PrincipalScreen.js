import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import AddExpense from "./AddExpense";
import AddIncome from "./AddIncome";

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
                Agregar Gasto
              </MDTypography>
            </MDBox>
            <MDBox pt={1} mx={5} mb={3}>
              <AddExpense />
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
                Agregar Ingreso
              </MDTypography>
            </MDBox>
            <MDBox pt={1} mx={5} mb={3}>
              <AddIncome />
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}
