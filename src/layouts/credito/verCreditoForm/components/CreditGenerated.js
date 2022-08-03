import React from "react";
import { Grid } from "@mui/material";
import DataTable from "examples/Tables/DataTable";
import CreditsInfo from "../../table/creditsInfo";

export default function CreditGenerated() {
  const { columns, rows } = CreditsInfo();

  return (
    <Grid container>
      <Grid item xs={12}>
        <DataTable
          table={{ columns, rows }}
          isSorted
          showTotalEntries={false}
          noEndBorder
          entriesPerPage={false}
          defaultEntries={5}
        />
      </Grid>
    </Grid>
  );
}
