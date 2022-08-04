// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import { Card, Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

// Data
import clientes from "./tables/tableCreditApproval";

function AprobarCreditos() {
  const { columns, rows } = clientes();

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
                  Aprobar Créditos
                </MDTypography>
              </MDBox>
              <MDBox>
                <DataTable
                  table={{ columns, rows }}
                  isSorted
                  canSearch
                  showTotalEntries={false}
                  noEndBorder
                  entriesPerPage={false}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AprobarCreditos;
