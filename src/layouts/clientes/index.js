import { Link } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import InfoIcon from "examples/Cards/IconInfo";

// Data
import clientes from "layouts/clientes/data/dataClients";
import clients from "layouts/clientes/data/clients.json";

function Tables() {
  const { columns, rows } = clientes();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3}>
        <Grid container spacing={6}>
          <Grid item xs={6} md={6} lg={4}>
            <MDBox>
              <Link to="/agregar-clientes">
                <InfoIcon
                  color="dark"
                  icon="person_add"
                  title="Agregar Cliente"
                  description="Total: "
                  count={clients.length}
                />
              </Link>
            </MDBox>
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
                  Lista de Clientes
                </MDTypography>
              </MDBox>
              <MDBox>
                <DataTable
                  table={{ columns, rows }}
                  canSearch
                  isSorted={false}
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

export default Tables;
