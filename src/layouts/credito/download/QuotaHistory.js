/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Workbook } from "react-excel-workbook";
import MDButton from "components/MDButton";
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

export default function QuotaHistory({ rows }) {
  const classes = useStyles();
  const { controlInfo } = useContext(ClientsContext);

  const quotaHistoryPDF = {
    pageMargins: [40, 40, 40, 80],
    background(currentPage) {
      return currentPage === 1
        ? [
            {
              canvas: [
                { type: "rect", x: 15, y: 15, w: 565, h: 305, r: 10, lineColor: "#000" },
                { type: "line", x1: 60, y1: 175, x2: 535, y2: 175, lineWidth: 2.5 },
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
            { text: `''${controlInfo.nameSlogan}''`, style: "title1", fontSize: 12 },
            { text: controlInfo.nameLocation, style: "title2" },
            { text: "TIPO DE TRANSACCIÓN", style: "title1", fontSize: 12 },
            { text: "SIMULADOR", style: "title3" },
          ],
        ],
      },
      "\n",
      "\n\n",
      "\n\n",
      //   {
      //     layout: {
      //       hLineWidth(i, node) {
      //         return i === 0 || i === node.table.body.length ? 2 : 1;
      //       },
      //       vLineWidth(i, node) {
      //         return i === 0 || i === node.table.widths.length ? 2 : 1;
      //       },
      //       hLineColor(i, node) {
      //         return i === 0 || i === node.table.body.length ? "black" : "gray";
      //       },
      //       vLineColor(i, node) {
      //         return i === 0 || i === node.table.widths.length ? "black" : "gray";
      //       },
      //       fillColor(rowIndex) {
      //         if (rowIndex === 0) return "#3d5662";
      //         return rowIndex % 2 === 0 ? "#e6fbff" : "#c6e6f5";
      //       },
      //       paddingLeft() {
      //         return 10;
      //       },
      //       paddingRight() {
      //         return 10;
      //       },
      //       paddingTop() {
      //         return 5;
      //       },
      //       paddingBottom() {
      //         return 5;
      //       },
      //     },
      //     table: {
      //       headerRows: 1,
      //       widths: [45, 73, 70, 79, 60, 60],
      //       body: buildTableBody(rows, [
      //         "cuota",
      //         "interesPeriodo",
      //         "capitalAmortizado",
      //         "desgravamen",
      //         "valorCuota",
      //         "saldo",
      //       ]),
      //     },
      //   },
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
    },
    defaultStyle: {
      columnGap: 20,
    },
  };

  const worksheets = [
    {
      name: "Historial de Cuotas",
      columns: [
        { label: "Cuota", value: "id" },
        { label: "Fecha de Pago", value: "transactionDate" },
        { label: "Valor", value: "value" },
        { label: "Tipo de Pago", value: "paymentType" },
        { label: "Observación", value: "observation" },
      ],
      data: rows,
    },
  ];

  const handleGeneratedPDF = () => {
    if (!rows[0] === false) {
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      pdfMake.createPdf(quotaHistoryPDF).open();
    }
  };

  return (
    <Grid container className={classes.root}>
      <Workbook
        filename="Historial-de-Cuotas.xlsx"
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
        // onClick={handlePrintPDF}
        sx={{ background: "#7B809A", "&:hover": { background: "#99A3A4" } }}
      >
        Descargar
      </MDButton>
    </Grid>
  );
}
