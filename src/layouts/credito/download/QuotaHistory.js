/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Workbook } from "react-excel-workbook";
import MDButton from "components/MDButton";
import ClientsContext from "context/Clients/ClientsContext";
import zfill from "elements/helpers/zfill";

const useStyles = makeStyles({
  root: {
    // Button
    "& .MuiButton-root": {
      width: "100%",
      marginBottom: 10,
    },
  },
});

export default function QuotaHistory({ rows, i, i2 }) {
  const classes = useStyles();
  const { clients, controlInfo } = useContext(ClientsContext);

  function buildTableBody(data, columns) {
    const body = [];

    const auxColumns = [
      { text: "Cuota", style: "table1" },
      { text: "Fecha de Pago", style: "table1" },
      { text: "Valor", style: "table1" },
      { text: "Tipo de Pago", style: "table1" },
      { text: "Observación", style: "table1" },
    ];

    body.push(auxColumns);

    data.forEach((row) => {
      const dataRow = [];

      columns.forEach((column) => {
        if (column === "observation")
          dataRow.push({ text: row[column].toString(), style: "row1", alignment: "left" });
        else dataRow.push({ text: row[column].toString(), style: "row1" });
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
          hLineColor: (val) => (val === 0 ? "lightgray" : ""),
          vLineWidth: () => 0,
          hLineWidth: (val) => (val === 0 ? 1 : 0),
        },
        table: {
          widths: ["*", 160],
          body: [[{ text: "" }, { text: `${currentPage}/${pageCount}`, alignment: "right" }]],
        },
      },
    ];
  }

  const quotaHistoryPDF = {
    pageMargins: [40, 40, 40, 60],
    footer: footerDefinition,
    background(currentPage) {
      return currentPage === 1
        ? [
            {
              canvas: [
                { type: "rect", x: 20, y: 15, w: 555, h: 280, r: 10, lineColor: "#000" },
                { type: "line", x1: 60, y1: 105, x2: 535, y2: 105, lineWidth: 2.5 },
                { type: "line", x1: 60, y1: 215, x2: 535, y2: 215, lineWidth: 2.5 },
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
            { text: controlInfo.nameLocation, style: "title1", fontSize: 10 },
          ],
        ],
      },
      "\n\n",
      {
        columns: [
          [
            {
              stack: [
                {
                  columns: [
                    { text: "Cliente:", style: "Col1", width: 95 },
                    { text: `${clients[i].firstName} ${clients[i].lastName}`, style: "Col2" },
                    { text: "Fecha de inicio:", style: "Col1", width: 80 },
                    { text: clients[i].credits[i2].initialDate, style: "Col2", width: 80 },
                  ],
                },
                {
                  columns: [
                    { text: "RUC:", style: "Col1", width: 95 },
                    { text: clients[i].identification, style: "Col2" },
                    { text: "Teléfono:", style: "Col1", width: 80 },
                    { text: clients[i].mobile, style: "Col2", width: 80 },
                  ],
                },
                {
                  columns: [
                    { text: "Dirección:", style: "Col1", width: 95 },
                    [{ text: clients[i].address, style: "Col2" }],
                  ],
                },
                {
                  columns: [
                    { text: "Valor Préstamo:", style: "Col1", width: 95 },
                    { text: `$ ${clients[i].credits[i2].loanValue}`, style: "Col2" },
                    { text: "Valor  Cuota:", style: "Col1", width: 80 },
                    {
                      text: `$ ${clients[i].credits[i2].monthlyPayment}`,
                      style: "Col2",
                      width: 80,
                    },
                  ],
                },
                {
                  columns: [
                    { text: "Número de Cuotas:", style: "Col1", width: 95 },
                    { text: clients[i].credits[i2].periods, style: "Col2" },
                    { text: "Total Interés:", style: "Col1", width: 80 },
                    { text: `${clients[i].credits[i2].interest} %`, style: "Col2", width: 80 },
                  ],
                },
              ],
            },
          ],
        ],
      },
      "\n\n",
      {
        columns: [
          [
            { text: "CREDITO OTORGADO", style: "title1" },
            { text: "HISTORIAL DE CUOTAS", style: "title3" },
            {
              text: [
                "CARPETA: ",
                { text: zfill(parseInt(clients[i].credits[i2].id, 10), 3), style: "subtitle" },
              ],
              style: "title1",
              fontSize: 10,
            },
          ],
        ],
      },
      "\n\n",
      "\n\n",
      {
        layout: {
          hLineWidth(aux, node) {
            return aux === 0 || aux === node.table.body.length ? 2 : 1;
          },
          vLineWidth(aux, node) {
            return aux === 0 || aux === node.table.widths.length ? 2 : 1;
          },
          hLineColor(aux, node) {
            return aux === 0 || aux === node.table.body.length ? "black" : "gray";
          },
          vLineColor(aux, node) {
            return aux === 0 || aux === node.table.widths.length ? "black" : "gray";
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
          widths: [40, 90, 70, 80, 130],
          body: buildTableBody(rows, [
            "id",
            "transactionDate",
            "value",
            "paymentType",
            "observation",
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
      subtitle: {
        color: "red",
        bold: true,
        italics: true,
        fontSize: 10,
      },
      title3: {
        color: "red",
        width: "*",
        bold: true,
        alignment: "center",
        marginBottom: 3,
        fontSize: 11,
      },
      Col1: {
        color: "#aaaaab",
        bold: true,
        fontSize: 11,
        alignment: "left",
        margin: [0, 0, 0, 3],
      },
      Col2: {
        color: "black",
        bold: false,
        fontSize: 11,
        alignment: "left",
      },
      table1: {
        alignment: "center",
        bold: true,
        color: "white",
        fontSize: 12,
      },
      row1: {
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
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(quotaHistoryPDF).open();
  };

  const handlePrintPDF = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(quotaHistoryPDF).download("Historial-de-Cuotas.pdf");
  };

  return (
    <Grid container className={classes.root} mx={2}>
      <Grid item xs={12} sm={6} md={2.5} lg={2}>
        <Workbook
          filename="Historial-de-Cuotas.xlsx"
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
