import DataTable from "examples/Tables/DataTable";
import historial from "../table/tableHistory";

export default function AccountStatusScreen() {
  const { columns, rows } = historial();
  console.log(columns);
  console.log(rows);
  return (
    <div>
      <DataTable
        table={{ columns, rows }}
        isSorted
        showTotalEntries={false}
        noEndBorder
        entriesPerPage={false}
      />
    </div>
  );
}
