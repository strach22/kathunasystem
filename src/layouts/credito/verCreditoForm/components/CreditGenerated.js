import React from "react";
import { Divider, Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import newCredit from "../tables/newCredit";

export default function CreditGenerated() {
  const { columns, rows } = newCredit();

  const getInfo = (category, info) => (
    <Grid container>
      <Grid item xs={4.5}>
        <MDTypography className="SubtitlesCreditInfo" variant="h6">
          {category}
        </MDTypography>
        <Divider sx={{ height: "1px" }} />
      </Grid>
      <Grid item xs={3}>
        <MDTypography className="SubtitlesCreditValue" variant="h6">
          {info}
        </MDTypography>
      </Grid>
    </Grid>
  );

  return (
    <Grid container>
      <Grid item xs={12}>
        {getInfo("Cuota a Pagar Periódicamente:", "$ 236.12")}
        {getInfo("Cantidad de Cuotas:", "38")}
        {getInfo("Total Interés a Pagar:", "$ 2452.01")}
        {getInfo("Valor del Préstamo:", "$ 844205.19")}
      </Grid>
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
