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

export default function PaymentIncomesHistory({ rows }) {
  const classes = useStyles();
  const { controlInfo } = useContext(ClientsContext);

  function buildTableBody(data, columns) {
    const body = [];

    const auxColumns = [
      { text: "Código", style: "table1" },
      { text: "Fecha del Ingreso", style: "table1" },
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

  const incomeHistoryPDF = {
    pageMargins: [40, 40, 40, 80],
    background(currentPage) {
      return currentPage === 1
        ? [
            {
              canvas: [{ type: "rect", x: 15, y: 15, w: 565, h: 160, r: 10, lineColor: "#000" }],
            },
          ]
        : "";
    },
    content: [
      {
        columns: [
          [
            { text: controlInfo.nameBank, style: "title1", fontSize: 14 },
            { text: `''${controlInfo.nameSlogan}''`, style: "title1", fontSize: 12 },
            { text: controlInfo.nameLocation, style: "title2" },
            { text: "TIPO", style: "title1", fontSize: 12 },
            { text: "HISTORIAL DE INGRESOS", style: "title3" },
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
          body: buildTableBody(rows, ["id", "incomeDate", "incomeValue", "observation"]),
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
      },
      title2: {
        color: "#333333",
        width: "*",
        fontSize: 10,
        bold: true,
        alignment: "center",
        marginBottom: 25,
      },
      title3: {
        color: "red",
        width: "*",
        fontSize: 12,
        bold: true,
        alignment: "center",
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
      name: "Historial de Ingresos",
      columns: [
        { label: "Código", value: "id" },
        { label: "Fecha del Ingreso", value: "incomeDate" },
        { label: "Valor", value: "incomeValue" },
        { label: "Observación", value: "observation" },
      ],
      data: rows,
    },
  ];

  const handleGeneratedPDF = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    pdfMake.createPdf(incomeHistoryPDF).open();
  };

  const handlePrintPDF = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    pdfMake.createPdf(incomeHistoryPDF).download("Historial-de-Ingresos.pdf");
  };

  return (
    <Grid container className={classes.root}>
      <Workbook
        filename="Historial-de-Ingresos.xlsx"
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

PaymentIncomesHistory.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      incomeDate: PropTypes.string.isRequired,
      incomeValue: PropTypes.string.isRequired,
      observation: PropTypes.string.isRequired,
    })
  ).isRequired,
};
