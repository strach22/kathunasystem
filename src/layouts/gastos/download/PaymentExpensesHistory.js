import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import MDButton from "components/MDButton";
import { Workbook } from "react-excel-workbook";
import { makeStyles } from "@mui/styles";
import ClientsContext from "context/Clients/ClientsContext";

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
  const { controlInfo } = useContext(ClientsContext);

  function buildTableBody(data, columns) {
    const body = [];

    const auxColumns = [
      { text: "Código", style: "table1" },
      { text: "Fecha del Gasto", style: "table1" },
      { text: "Valor", style: "table1" },
      { text: "Observación", style: "table1" },
    ];

    body.push(auxColumns);

    data.forEach((row) => {
      const dataRow = [];

      columns.forEach((column) => {
        if (column === "observation")
          dataRow.push({ text: row[column].toString(), style: "table2", alignment: "left" });
        else dataRow.push({ text: row[column].toString(), style: "table2" });
      });

      body.push(dataRow);
    });

    return body;
  }

  function footerDefinition(currentPage, pageCount) {
    return [
      {
        margin: [40, 10, 40],
        layout: {
          hLineColor: (i) => (i === 0 ? "lightgray" : ""),
          vLineWidth: () => 0,
          hLineWidth: (i) => (i === 0 ? 1 : 0),
        },
        table: {
          widths: ["*", 160],
          body: [[{ text: "" }, { text: `${currentPage}/${pageCount}`, alignment: "right" }]],
        },
      },
    ];
  }

  const expensisHistoryPDF = {
    pageMargins: [40, 40, 40, 60],
    footer: footerDefinition,
    background(currentPage) {
      return currentPage === 1
        ? [
            {
              canvas: [
                { type: "rect", x: 20, y: 15, w: 555, h: 160, r: 10, lineColor: "#000" },
                { type: "line", x1: 97, y1: 100, x2: 498, y2: 100, lineWidth: 2.5 },
              ],
            },
          ]
        : "";
    },
    content: [
      {
        columns: [
          [
            { text: controlInfo.nameBank, style: "title1", fontSize: 14 },
            { text: `''${controlInfo.nameSlogan}''`, style: "title1" },
            { text: controlInfo.nameLocation, style: "title2" },
            { text: "TIPO DE TRANSACCIÓN", style: "title1" },
            { text: "HISTORIAL DE GASTOS", style: "title3" },
          ],
        ],
      },
      "\n",
      "\n\n",
      "\n\n",
      {
        layout: {
          hLineWidth(i, node) {
            return i === 0 || i === node.table.body.length ? 2 : 1;
          },
          vLineWidth(i, node) {
            return i === 0 || i === node.table.widths.length ? 2 : 1;
          },
          hLineColor(i, node) {
            return i === 0 || i === node.table.body.length ? "black" : "gray";
          },
          vLineColor(i, node) {
            return i === 0 || i === node.table.widths.length ? "black" : "gray";
          },
          fillColor(rowIndex) {
            if (rowIndex === 0) return "#3d5662";
            return rowIndex % 2 === 0 ? "#e6fbff" : "#c6e6f5";
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
          widths: ["auto", "auto", 60, "*"],
          body: buildTableBody(rows, ["id", "expenseDate", "expenseValue", "observation"]),
        },
      },
    ],

    styles: {
      title1: {
        color: "#333333",
        width: "*",
        bold: true,
        alignment: "center",
        marginBottom: 3,
        fontSize: 12,
      },
      title2: {
        color: "#333333",
        width: "*",
        bold: true,
        alignment: "center",
        marginBottom: 25,
        fontSize: 12,
      },
      title3: {
        color: "red",
        italics: true,
        width: "*",
        bold: true,
        alignment: "center",
        fontSize: 12,
      },
      table1: {
        alignment: "center",
        bold: true,
        color: "white",
        fontSize: 12,
      },
      table2: {
        alignment: "center",
        color: "black",
        fontSize: 10,
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

    pdfMake.createPdf(expensisHistoryPDF).download("Historial-de-Gastos.pdf");
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
