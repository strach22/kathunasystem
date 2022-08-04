import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { makeStyles } from "@mui/styles";
import { Workbook } from "react-excel-workbook";
import MDButton from "components/MDButton";
import ClientsContext from "context/Clients/ClientsContext";

const useStyles = makeStyles({
  root: {
    // Button
    "& .MuiButton-root": {
      width: "100%",
      marginBottom: 10,
    },
  },
});

export default function SimulatorHistory({ rows }) {
  const classes = useStyles();
  const { controlInfo } = useContext(ClientsContext);

  function buildTableBody(data, columns) {
    const body = [];

    const auxColumns = [
      { text: "Periodo", style: "table1", marginTop: 7 },
      { text: "Interes Periodo", style: "table1" },
      { text: "Capital Amortizado", style: "table1" },
      { text: "Desgravamen", style: "table1", marginTop: 7 },
      { text: "Valor Cuota", style: "table1" },
      { text: "Saldo", style: "table1", marginTop: 7 },
    ];

    body.push(auxColumns);

    data.forEach((row) => {
      const dataRow = [];

      columns.forEach((column) => {
        dataRow.push({
          text: row[column].toString(),
          alignment: "center",
          color: "black",
          fontSize: 10,
        });
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

  const simulatorPDF = {
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
            { text: "SIMULADOR", style: "title3" },
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
          widths: [45, 73, 70, 79, 60, 60],
          body: buildTableBody(rows, [
            "cuota",
            "interesPeriodo",
            "capitalAmortizado",
            "desgravamen",
            "valorCuota",
            "saldo",
          ]),
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
    },
    defaultStyle: {
      columnGap: 20,
    },
  };

  const worksheets = [
    {
      name: "Historial de Gastos",
      columns: [
        { label: "Cuotas", value: "cuota" },
        { label: "Interés Periodo", value: "interesPeriodo" },
        { label: "Capital Amortizado", value: "capitalAmortizado" },
        { label: "Desgravamen", value: "desgravamen" },
        { label: "Valor Cuota", value: "valorCuota" },
        { label: "Saldo", value: "saldo" },
      ],
      data: rows,
    },
  ];

  const handleGeneratedPDF = () => {
    if (!rows[0] === false) {
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      pdfMake.createPdf(simulatorPDF).open();
    }
  };

  const handlePrintPDF = () => {
    if (!rows[0] === false) {
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      pdfMake.createPdf(simulatorPDF).download("Tabla-de-Amortización.pdf");
    }
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={6} md={2.5} lg={2}>
        <Workbook
          filename="Tabla-de-Amortización.xlsx"
          element={
            <MDButton
              variant="text"
              size="medium"
              sx={{ background: "#688C29", "&:hover": { background: "#808D68" } }}
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
      </Grid>

      <Grid item xs={12} sm={6} md={2.5} lg={2}>
        <MDButton
          variant="text"
          size="medium"
          onClick={handleGeneratedPDF}
          sx={{ background: "#961515", "&:hover": { background: "#954242" } }}
        >
          PDF
        </MDButton>
      </Grid>

      <Grid item xs={12} sm={6} md={2.5} lg={2}>
        <MDButton
          variant="text"
          size="medium"
          onClick={handlePrintPDF}
          sx={{ background: "#434343", "&:hover": { background: "#5A5A5A" } }}
        >
          Descargar
        </MDButton>
      </Grid>
    </Grid>
  );
}

SimulatorHistory.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      cuota: PropTypes.string.isRequired,
      interesPeriodo: PropTypes.string.isRequired,
      capitalAmortizado: PropTypes.string.isRequired,
      desgravamen: PropTypes.string.isRequired,
      valorCuota: PropTypes.string.isRequired,
      saldo: PropTypes.string.isRequired,
    })
  ).isRequired,
};
