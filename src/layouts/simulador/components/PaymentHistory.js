import React from "react";
import { Grid } from "@mui/material";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import amortizacionTable from "../table/amortizacionTable";

// eslint-disable-next-line react/prop-types
export default function AccountStatusScreen({ parameters }) {
  const { columns, rows } = amortizacionTable(parameters);

  const handleGeneratedPDF = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    console.log("hola Diuks");
    const tablaAmortizacionSimulador = {
      pageMargins: [40, 40, 40, 80],
      content: [
        "First paragraph",
        "Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines",
      ],
    };

    pdfMake.createPdf(tablaAmortizacionSimulador).download();
  };

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
        <MDButton
          size="large"
          variant="contained"
          color="info"
          sx={{
            "&:hover": { background: "#5499C7" },
            width: "100%",
            marginTop: "50px",
          }}
          onClick={handleGeneratedPDF}
        >
          GENERAR PDF
        </MDButton>
      </Grid>
    </Grid>
  );
}
