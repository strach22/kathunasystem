import DataTable from "examples/Tables/DataTable";
import historial from "../../table/tableHistoryPayments";

export default function MonthlyPaymentHistory() {
  const { columns, rows } = historial();
  return (
    <DataTable
      table={{ columns, rows }}
      isSorted
      showTotalEntries={false}
      noEndBorder
      entriesPerPage={false}
      defaultEntries={5}
    />
  );
}
