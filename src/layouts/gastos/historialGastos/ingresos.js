import { useNavigate } from "react-router-dom";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Card, Grid } from "@mui/material";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import IncomesTable from "../table/incomesTable";
import PaymentIncomesHistory from "../download/PaymentIncomesHistory";

function gastos() {
  const navigate = useNavigate();
  const { columns, rows } = IncomesTable();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3} mx={4}>
        <Grid container>
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
                  Historial de Ingresos
                </MDTypography>
              </MDBox>
              <MDBox pt={3} mx={2.5} mb={4}>
                <PaymentIncomesHistory rows={rows} />
                <DataTable
                  table={{ columns, rows }}
                  showTotalEntries={false}
                  noEndBorder
                  entriesPerPage={false}
                />
                <Grid item xs={12} sm={6} md={5} lg={4} mt={2}>
                  <MDButton
                    variant="text"
                    size="large"
                    onClick={() => navigate("/gastos")}
                    sx={{
                      background: "#7B809A",
                      "&:hover": { background: "#99A3A4" },
                      width: "100%",
                    }}
                  >
                    Regresar
                  </MDButton>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default gastos;
