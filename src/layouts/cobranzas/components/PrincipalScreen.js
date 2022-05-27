import React from "react";
import { makeStyles } from "@mui/styles";
import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import collectionsTable from "../tables/collectionsTable";

const useStyles = makeStyles({
  root: {
    "& .css-1f19gdh": {
      margin: "30px",
      padding: "24px",
    },
  },
});

export default function PrincipalScreen() {
  const classes = useStyles();
  const { columns, rows } = collectionsTable();
  return (
    <MDBox pt={6} pb={3} mx={15}>
      <Grid container spacing={6} className={classes.root}>
        <Grid item xs={12}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              borderRadius="lg"
              coloredShadow="error"
              sx={{ background: "#BC2709" }}
            >
              <MDTypography variant="h5" color="white">
                Registro de Pagos Vencidos
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
              <DataTable
                table={{ columns, rows }}
                isSorted={false}
                showTotalEntries={false}
                noEndBorder
                entriesPerPage={false}
              />
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}
