import React from "react";
import { Grid } from "@mui/material";
import DataTable from "examples/Tables/DataTable";
import amortizacionTable from "../table/amortizacionTable";
import PruebaPDF1 from "../download/PruebaPDF1";

// eslint-disable-next-line react/prop-types
export default function AccountStatusScreen({ parameters }) {
  const { columns, rows } = amortizacionTable(parameters);

  return (
    <Grid container>
      <Grid item xs={12}>
        <DataTable
          table={{ columns, rows }}
          isSorted={false}
          showTotalEntries={false}
          noEndBorder
          entriesPerPage={false}
        />
      </Grid>
      <Grid item xs={4}>
        <PruebaPDF1 />
      </Grid>
    </Grid>
  );
}
