import DataTable from "examples/Tables/DataTable";
import amortizacionTable from "../table/amortizacionTable";

// eslint-disable-next-line react/prop-types
export default function AccountStatusScreen({ parameters }) {
  const { columns, rows } = amortizacionTable(parameters);
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
