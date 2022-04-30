import DataTable from "examples/Tables/DataTable";
import historial from "../../../depositos/table/tableHistory";

export default function AccountStatusScreen() {
  const { columns, rows } = historial();
  return (
    <div>
      <DataTable
        table={{ columns, rows }}
        showTotalEntries={false}
        noEndBorder
        entriesPerPage={false}
      />
    </div>
  );
}
