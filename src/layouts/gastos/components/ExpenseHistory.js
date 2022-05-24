import DataTable from "examples/Tables/DataTable";
import ExpenseTable from "../table/expensesTable";

export default function ExpenseHistory() {
  const { columns, rows } = ExpenseTable();

  return (
    <DataTable
      table={{ columns, rows }}
      showTotalEntries={false}
      noEndBorder
      entriesPerPage={false}
    />
  );
}
