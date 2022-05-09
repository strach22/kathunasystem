import DataTable from "examples/Tables/DataTable";
import historial from "../table/tableHistory";

export default function AccountStatusScreen() {
  const { columns, rows } = historial();
  return (
    <div>
      <DataTable
        table={{ columns, rows }}
        isSorted
        showTotalEntries={false}
        noEndBorder
        entriesPerPage={false}
        defaultEntries={5}
      />
    </div>
  );
}
