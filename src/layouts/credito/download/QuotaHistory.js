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
import { useParams } from "react-router-dom";

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
  const { clients, controlInfo } = useContext(ClientsContext);
  const { id } = useParams();

  const [idC, idF] = id.split("-");
  const i = clients.map((e) => e.id).indexOf(idC);
  const i2 = clients[i].credits.map((e) => e.id).indexOf(idF);

  const quotaHistoryPDF = {
    pageMargins: [40, 40, 40, 80],
    background(currentPage) {
      return currentPage === 1
        ? [
            {
              canvas: [
                { type: "rect", x: 15, y: 15, w: 565, h: 285, r: 10, lineColor: "#000" },
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
            { text: `''${controlInfo.nameSlogan}''`, style: "title1" },
            { text: controlInfo.nameLocation, style: "title2" },
            { text: "CREDITO OTORGADO", style: "title1" },
            { text: "HISTORIAL DE CUOTAS", style: "title3" },
            {
              text: [
                "CARPETA: ",
                {
                  text: zfill(parseInt(clients[i].credits[i2].id, 10), 3),
                  style: "title3",
                  italics: true,
                },
              ],
              style: "title2",
            },
          ],
        ],
      },
      "\n",
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
                    { text: "Número de Cuotas:", style: "Col1", width: 95, marginBottom: 80 },
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
    ],
    styles: {
      title1: {
        color: "#333333",
        fontSize: 12,
        width: "*",
        bold: true,
        alignment: "center",
        marginBottom: 3,
      },
      title2: {
        color: "#333333",
        fontSize: 10,
        width: "*",
        bold: true,
        alignment: "center",
        marginBottom: 25,
      },
      title3: {
        color: "red",
        width: "*",
        fontSize: 11,
        bold: true,
        alignment: "center",
        marginBottom: 2,
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
