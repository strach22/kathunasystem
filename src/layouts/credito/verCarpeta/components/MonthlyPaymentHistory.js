import { Grid } from "@mui/material";
import DataTable from "examples/Tables/DataTable";
import QuotaHistory from "layouts/credito/download/QuotaHistory";
import historial from "../../table/tableHistoryPayments";

export default function MonthlyPaymentHistory() {
  const { columns, rows } = historial();
  return (
    <Grid container>
      <QuotaHistory rows={rows} />
      <DataTable
        table={{ columns, rows }}
        isSorted
        showTotalEntries={false}
        noEndBorder
        entriesPerPage={false}
        defaultEntries={5}
      />
    </Grid>
  );
}
