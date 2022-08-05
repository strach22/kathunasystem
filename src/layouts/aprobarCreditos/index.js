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
      <Grid container>
        <Grid item xs={0} md={0.4} lg={0.6} xl={0.8}>
          {}
        </Grid>
        <Grid item xs={12} md={11.2} lg={10.8} xl={10.4} pt={6}>
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
        <Grid item xs={0} md={0.4} lg={0.6} xl={0.8}>
          {}
        </Grid>
      </Grid>
      <Footer />
    </DashboardLayout>
  );
}

export default AprobarCreditos;
