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
    const tablaAmortizacionSimulador = {
      pageMargins: [40, 40, 40, 80],
      content: [
        { text: "CAJA DE AHORRO SAN PABLITO", style: "principalTitle" },
        { text: " ''SEMBRANDO EL FUTURO IMPULSANDO AL DESARROLLO'' ", style: "principalTitle" },
        { text: "SAN PABLITO", style: "principalTitle" },

        { text: " ", lineHeight: 1.5 },

        { text: "TIPO DE TRANSACCIÓN", style: "secundaryTitle" },
        { text: "SIMULADOR", style: "secundaryTitle", color: "red" },

        {
          text: "_________________________________________________________________",
          style: "border",
        },
      ],

      styles: {
        header: {
          border: [true, true, true, true],
          fillColor: "#eeffee",
        },
        principalTitle: {
          alignment: "center",
          color: "black",
          fontSize: 12,
          bold: true,
          lineHeight: 1.25,
        },
        secundaryTitle: {
          alignment: "center",
          color: "black",
          fontSize: 10,
          bold: true,
        },
        border: {
          fontSize: 15,
          bold: true,
          alignment: "center",
          color: "black",
          marginTop: 15,
          marginBottom: 15,
        },
        rowData: {
          fontSize: 10,
          bold: true,
          alignment: "left",
          color: "black",
        },
        rowDataResp: {
          fontSize: 9,
          alignment: "left",
          color: "#424141",
        },
      },
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
