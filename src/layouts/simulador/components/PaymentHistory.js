import DataTable from "examples/Tables/DataTable";
import amortizacionTable from "../table/amortizacionTable";

export default function AccountStatusScreen() {
  const { columns, rows } = amortizacionTable();
  return (
    <div>
      <DataTable
        table={{ columns, rows }}
        isSorted={false}
        showTotalEntries={false}
        noEndBorder
        entriesPerPage={false}
      />
    </div>
  );
}
