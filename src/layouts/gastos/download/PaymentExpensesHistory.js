import React from "react";
import { Grid } from "@mui/material";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import MDButton from "components/MDButton";

// eslint-disable-next-line react/prop-types
export default function PaymentExpensesHistory({ rows }) {
  function buildTableBody(data, columns) {
    const body = [];

    const auxColumns = ["Código", "Fecha del Gasto ", "Valor", "Observación"];

    body.push(auxColumns);

    data.forEach((row) => {
      const dataRow = [];

      columns.forEach((column) => {
        dataRow.push(row[column].toString());
      });

      body.push(dataRow);
    });

    return body;
  }

  const handleGeneratedPDF = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const expensisHistory = {
      pageMargins: [40, 40, 40, 80],
      content: [
        {
          columns: [
            [
              {
                text: "CAJA DE AHORRO SAN PABLITO",
                color: "#333333",
                width: "*",
                fontSize: 18,
                bold: true,
                alignment: "center",
                margin: [0, 0, 0, 3],
              },
              {
                text: "HISTORIAL DE GASTOS",
                color: "#333333",
                width: "*",
                fontSize: 15,
                bold: true,
                alignment: "center",
              },
            ],
          ],
        },
        {
          text: "_________________________________________________________________",
          style: "border",
        },
        {
          layout: {
            defaultBorder: false,
            fillColor(rowIndex) {
              return rowIndex % 2 === 0 ? "#CCCCCC" : null;
            },
            hLineColor(i) {
              if (i === 1 || i === 0) {
                return "#bfdde8";
              }
              return "#eaeaea";
            },
            paddingLeft() {
              return 10;
            },
            paddingRight() {
              return 10;
            },
            paddingTop() {
              return 2;
            },
            paddingBottom() {
              return 2;
            },
            // fillColor() {
            //   return "#fff";
            // },
          },
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*"],
            body: buildTableBody(rows, ["id", "expenseDate", "expenseValue", "observation"]),
          },
        },
      ],

      styles: {
        border: {
          fontSize: 15,
          bold: true,
          alignment: "center",
          color: "black",
          marginTop: 15,
          marginBottom: 15,
        },
      },
      defaultStyle: {
        columnGap: 20,
      },
    };

    pdfMake.createPdf(expensisHistory).open();
  };

  return (
    <Grid container>
      <MDButton
        variant="text"
        size="medium"
        sx={{ background: "#5499C7", "&:hover": { background: "#8CB0C8" } }}
      >
        Excel
      </MDButton>
      <MDButton
        variant="text"
        size="medium"
        onClick={handleGeneratedPDF}
        sx={{ background: "#5499C7", "&:hover": { background: "#8CB0C8" } }}
      >
        PDF
      </MDButton>
      <MDButton
        variant="text"
        size="medium"
        sx={{ background: "#5499C7", "&:hover": { background: "#8CB0C8" } }}
      >
        Descargar
      </MDButton>
    </Grid>
  );
}
