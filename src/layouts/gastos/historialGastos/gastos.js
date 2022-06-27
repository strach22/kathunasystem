import { useNavigate } from "react-router-dom";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { makeStyles } from "@mui/styles";
import { Card, Grid } from "@mui/material";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import PaymentExpensesHistory from "../download/PaymentExpensesHistory";
import ExpenseTable from "../table/expensesTable";

const useStyles = makeStyles({
  root: {
    "& .css-1f19gdh": {
      margin: "30px",
      padding: "24px",
    },
  },
});

function gastos() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { columns, rows } = ExpenseTable();
  return (
    <DashboardLayout>
      <DashboardNavbar />
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
                  Historial de Gastos
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <PaymentExpensesHistory rows={rows} />
                <DataTable
                  table={{ columns, rows }}
                  showTotalEntries={false}
                  noEndBorder
                  entriesPerPage={false}
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} lg={11}>
            <MDButton
              variant="text"
              size="large"
              onClick={() => navigate("/gastos")}
              sx={{ background: "#7B809A", "&:hover": { background: "#99A3A4" } }}
            >
              Regresar
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default gastos;
