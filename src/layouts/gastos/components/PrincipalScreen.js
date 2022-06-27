import { makeStyles } from "@mui/styles";
import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import AddExpense from "./AddExpense";
import AddIncome from "./AddIncome";

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
                Agregar Gasto
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
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
            <MDBox pt={3}>
              <AddIncome />
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}
