import { useContext } from "react";

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

import ClientsContext from "../../context/Clients/ClientsContext";

function Creditos() {
  const { controlInfo } = useContext(ClientsContext);
  const columns = [
    { Header: "id", accessor: "id", align: "center" },
    { Header: "Fecha", accessor: "expenseDate", align: "center" },
    { Header: "Monto", accessor: "expenseValue", align: "center" },
    { Header: "Razón", accessor: "observation", align: "center" },
  ];
  const rows = controlInfo.incomesHystory.map((info) => ({
    id: info.id,
    incomeDate: info.incomeDate,
    incomeValue: `$ ${info.incomeValue}`,
    observation: info.observation,
  }));
  controlInfo.expensesHystory.forEach((info) => {
    rows.push({
      id: info.id,
      expenseDate: info.expenseDate,
      expenseValue: `$ ${info.expenseValue}`,
      observation: info.observation,
    });
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3}>
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
                  Historial de Ingresos-Egresos
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

export default Creditos;
