import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import MDButton from "components/MDButton";
import { Workbook } from "react-excel-workbook";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    // Button
    "& .MuiButton-root": {
      marginBottom: "20px",
      marginRight: "1px",
    },
  },
});

export default function PaymentExpensesHistory({ rows }) {
  const classes = useStyles();

  function buildTableBody(data, columns) {
    const body = [];

    const auxColumns = [
      { text: "Código", alignment: "center", bold: true, color: "white", fontSize: 15 },
      { text: "Fecha del Gasto", alignment: "center", bold: true, color: "white", fontSize: 15 },
      { text: "Valor", alignment: "center", bold: true, color: "white", fontSize: 15 },
      { text: "Observación", alignment: "center", bold: true, color: "white", fontSize: 15 },
    ];

    body.push(auxColumns);

    data.forEach((row) => {
      const dataRow = [];

      columns.forEach((column) => {
        // dataRow.push(row[column].toString());
        if (column === "observation")
          dataRow.push({
            text: row[column].toString(),
            alignment: "left",
            color: "black",
            marginLeft: 25,
          });
        else dataRow.push({ text: row[column].toString(), alignment: "center", color: "black" });
      });

      body.push(dataRow);
    });

    return body;
  }

  const expensisHistoryPDF = {
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
            if (rowIndex === 0) return "#088FCA";
            return rowIndex % 2 === 0 ? "#85B1C4" : "#D3D3D3";
          },
          paddingLeft() {
            return 10;
          },
          paddingRight() {
            return 10;
          },
          paddingTop() {
            return 5;
          },
          paddingBottom() {
            return 5;
          },
        },
        table: {
          headerRows: 1,
          widths: ["auto", "auto", "auto", "*"],
          // widths: ["auto", 110, 120, "*"],
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
        marginTop: 20,
        marginBottom: 40,
      },
    },
    defaultStyle: {
      columnGap: 20,
    },
  };

  const worksheets = [
    {
      name: "Historial de Gastos",
      columns: [
        { label: "Código", value: "id" },
        { label: "Fecha del Gasto", value: "expenseDate" },
        { label: "Valor", value: "expenseValue" },
        { label: "Observación", value: "observation" },
      ],
      data: rows,
    },
  ];

  const handleGeneratedPDF = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    pdfMake.createPdf(expensisHistoryPDF).open();
  };

  const handlePrintPDF = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    pdfMake.createPdf(expensisHistoryPDF).download();
  };

  return (
    <Grid container className={classes.root}>
      <Workbook
        filename="Historial-de-Gastos.xlsx"
        element={
          <MDButton
            variant="text"
            size="medium"
            sx={{ background: "#7B809A", "&:hover": { background: "#99A3A4" } }}
          >
            Excel
          </MDButton>
        }
      >
        {worksheets.map(({ name, columns, data }) => (
          <Workbook.Sheet name={name} data={data}>
            {columns.map(({ label, value }) => (
              <Workbook.Column label={label} value={value} />
            ))}
          </Workbook.Sheet>
        ))}
      </Workbook>
      <MDButton
        variant="text"
        size="medium"
        onClick={handleGeneratedPDF}
        sx={{ background: "#7B809A", "&:hover": { background: "#99A3A4" } }}
      >
        PDF
      </MDButton>
      <MDButton
        variant="text"
        size="medium"
        onClick={handlePrintPDF}
        sx={{ background: "#7B809A", "&:hover": { background: "#99A3A4" } }}
      >
        Descargar
      </MDButton>
    </Grid>
  );
}

PaymentExpensesHistory.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      expenseDate: PropTypes.string.isRequired,
      expenseValue: PropTypes.string.isRequired,
      observation: PropTypes.string.isRequired,
    })
  ).isRequired,
};
