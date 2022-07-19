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
  const { controlInfo, clients } = useContext(ClientsContext);
  const columns = [
    { Header: "id", accessor: "id", align: "center" },
    { Header: "Fecha", accessor: "date", align: "center" },
    { Header: "Monto", accessor: "value", align: "center" },
    { Header: "Razón", accessor: "observation", align: "center" },
    { Header: "Categoría", accessor: "category", align: "center" },
  ];
  let rows = controlInfo.incomesHystory.map((info) => ({
    id: info.id,
    date: info.incomeDate,
    value: `$ ${info.incomeValue}`,
    observation: info.observation,
    category: "Ingresos",
  }));
  controlInfo.expensesHystory.forEach((info) => {
    rows.push({
      id: info.id,
      date: info.expenseDate,
      value: `$ -${info.expenseValue}`,
      observation: info.observation,
      category: "Egresos",
    });
  });
  clients.forEach((client) => {
    client.savingHistory.forEach((info) => {
      rows.push({
        id: info.id,
        date: info.transactionDate,
        value: `$ ${info.value}`,
        observation: info.observation,
        category: "Transacciones Ahorros",
      });
    });
  });
  rows = rows.sort((a, b) => new Date(a.date) - new Date(b.date));
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
