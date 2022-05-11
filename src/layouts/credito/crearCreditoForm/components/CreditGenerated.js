import React from "react";
import { Divider, Grid } from "@mui/material";
import MDTypography from "components/MDTypography";

export default function CreditGenerated() {
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
      {getInfo("Cuota a Pagar Periódicamente:", "$ 236.12")}
      {getInfo("Cantidad de Cuotas:", "38")}
      {getInfo("Total Interés a Pagar:", "$ 2452.01")}
      {getInfo("Valor del Préstamo:", "$ 844205.19")}
    </Grid>
  );
}
