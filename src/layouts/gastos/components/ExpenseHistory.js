import { Grid } from "@mui/material";
import DataTable from "examples/Tables/DataTable";
import PaymentExpensesHistory from "../download/PaymentExpensesHistory";
import ExpenseTable from "../table/expensesTable";

export default function ExpenseHistory() {
  const { columns, rows } = ExpenseTable();

  return (
    <Grid container>
      <PaymentExpensesHistory rows={rows} />
      <DataTable
        table={{ columns, rows }}
        showTotalEntries={false}
        noEndBorder
        entriesPerPage={false}
      />
    </Grid>
  );
}
