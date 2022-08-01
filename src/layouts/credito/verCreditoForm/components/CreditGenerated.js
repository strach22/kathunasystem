import React from "react";
import { Grid } from "@mui/material";
import DataTable from "examples/Tables/DataTable";
import { Link } from "react-router-dom";
import MDButton from "components/MDButton";
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
      <Grid item xs={8} sm={5} md={4} lg={3}>
        <Link to="/creditos">
          <MDButton
            size="large"
            variant="contained"
            color="secondary"
            sx={{
              "&:hover": { background: "#99A3A4" },
              width: "100%",
              margin: "20px 0px 30px 30px",
            }}
          >
            REGRESAR
          </MDButton>
        </Link>
      </Grid>
    </Grid>
  );
}
