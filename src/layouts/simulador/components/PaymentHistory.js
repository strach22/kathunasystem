import React from "react";
import { Grid } from "@mui/material";
import DataTable from "examples/Tables/DataTable";
import amortizacionTable from "../table/amortizacionTable";
import SimulatorHistory from "../download/SimulatorHistory";

// eslint-disable-next-line react/prop-types
export default function AccountStatusScreen({ parameters }) {
  const { columns, rows } = amortizacionTable(parameters);

  return (
    <Grid container>
      <SimulatorHistory rows={rows} />
      <DataTable
        table={{ columns, rows }}
        isSorted={false}
        showTotalEntries={false}
        noEndBorder
        entriesPerPage={false}
      />
    </Grid>
  );
}
