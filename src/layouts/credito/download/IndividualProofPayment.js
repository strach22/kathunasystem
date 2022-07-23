/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import MDButton from "components/MDButton";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import ClientsContext from "context/Clients/ClientsContext";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import zfill from "elements/helpers/zfill";
import { numbToLetters } from "elements/helpers/numbToLetters";

export default function IndividualProofPayment({ info, i, i2 }) {
  const { id, value, transactionDate, observation, receipt } = info;

  const { clients, controlInfo } = useContext(ClientsContext);

  const lettersExpenseValue = numbToLetters(value, {
    plural: "dólares estadounidenses",
    singular: "dólar estadounidense",
    centPlural: "centavos",
    centSingular: "centavo",
  });

  const individualProofPaymentPDF = {
    pageSize: "A6",
    pageMargins: [30, 10, 30, 0],
    background(currentPage) {
      return currentPage === 1
        ? [
            {
              canvas: [
                { type: "rect", x: 15, y: 5, w: 267, h: 155, r: 10, lineColor: "#000" },
                { type: "line", x1: 60, y1: 50, x2: 237, y2: 50, lineWidth: 2.5 },
                { type: "line", x1: 60, y1: 110, x2: 237, y2: 110, lineWidth: 2.5 },
              ],
            },
          ]
        : "";
    },
    content: [
      {
        columns: [
          [
            { text: controlInfo.nameBank, style: "title1", fontSize: 10 },
            { text: `''${controlInfo.nameSlogan}''`, style: "title1" },
            { text: controlInfo.nameLocation, style: "title1", marginBottom: 15, fontSize: 7 },
            {
              stack: [
                {
                  columns: [
                    { text: "Cliente", style: "subtitle1", width: 34 },
                    { text: `${clients[i].firstName} ${clients[i].lastName}`, style: "subtitle3" },
                  ],
                },
                {
                  columns: [
                    { text: "RUC", style: "subtitle1", width: 34 },
                    { text: clients[i].identification, style: "subtitle3" },
                    { text: "Recibo No.", style: "subtitle1", width: 39 },
                    { text: zfill(receipt, 4), style: "subtitle2", width: 43 },
                  ],
                },
                {
                  columns: [
                    { text: "Dirección", style: "subtitle1", width: 34 },
                    { text: clients[i].address, style: "subtitle3" },
                  ],
                },
                {
                  columns: [
                    { text: "Crédito", style: "subtitle1", width: 34 },
                    { text: `$ ${clients[i].credits[i2].loanValue}`, style: "subtitle3" },
                    { text: "Fecha", style: "subtitle1", width: 39 },
                    { text: transactionDate, style: "subtitle2", width: 43 },
                  ],
                },
              ],
            },
            { text: "HISTORIAL DE CUOTAS DE CRÉDITO", style: "title1", marginTop: 15 },
            { text: "COMPROBANTE DE PAGOS", style: "title1", color: "red" },
            {
              text: [
                "CARPETA: ",
                { text: zfill(parseInt(clients[i].credits[i2].id, 10), 3), style: "title2" },
                { text: " - Total de Cuotas: ", style: "title1" },
                { text: zfill(parseInt(clients[i].credits[i2].periods, 10), 3), style: "title2" },
              ],
              style: "title1",
            },
          ],
        ],
      },
      "\n\n",
      {
        layout: {
          defaultBorder: false,
          hLineColor(val) {
            return val === 0 || val === 1 ? "#bfdde8" : "#eaeaea";
          },
          paddingLeft() {
            return 10;
          },
          paddingRight() {
            return 10;
          },
          paddingTop() {
            return 1;
          },
          paddingBottom() {
            return 1;
          },
          fillColor() {
            return "#fff";
          },
        },
        table: {
          headerRows: 1,
          widths: ["*", "auto"],
          body: [
            [
              { text: "DETALLE", style: "table1", border: [false, true, false, true] },
              {
                text: "VALOR",
                style: "table1",
                alignment: "right",
                border: [false, true, false, true],
              },
            ],
            [
              {
                text: `Pago de la cuota número ${id}`,
                style: "table2",
                border: [false, false, false, true],
              },
              { text: `$ ${value}`, style: "table3", border: [false, false, false, true] },
            ],
            [
              { text: "---", style: "table2", color: "white", border: [false, false, false, true] },
              { text: "", style: "table3", border: [false, false, false, true] },
            ],
            [
              { text: "Subtotal", style: "table5", border: [false, true, false, true] },
              { text: `$ ${value}`, style: "table3", border: [false, true, false, true] },
            ],
            [
              { text: "Impuestos", style: "table5", border: [false, false, false, true] },
              { text: "$ 0", style: "table3", border: [false, false, false, true] },
            ],
            [
              { text: "Total", style: "table4", border: [false, false, false, true] },
              {
                text: `$ ${value}`,
                style: "table4",
                fillColor: "#f5f5f5",
                border: [false, false, false, true],
              },
            ],
          ],
        },
      },
      {
        text: ["La cantidad es: ", { text: lettersExpenseValue, style: "text2" }],
        style: "text1",
      },
      {
        text: ["Observación: ", { text: observation, style: "text2" }],
        style: "text1",
      },
      "\n\n",
      { text: "____________________________", style: "border" },
      { text: "Beneficiario", alignment: "center", fontSize: 10 },
    ],

    styles: {
      border: {
        fontSize: 15,
        bold: true,
        alignment: "center",
        marginBottom: 3,
      },
      title1: {
        color: "#333333",
        width: "*",
        bold: true,
        alignment: "center",
        marginBottom: 2,
        fontSize: 8,
      },
      title2: {
        color: "red",
        width: "*",
        alignment: "center",
        italics: true,
        fontSize: 8,
      },
      subtitle1: {
        color: "#aaaaab",
        bold: true,
        alignment: "left",
        marginBottom: 2,
        fontSize: 8,
      },
      subtitle2: {
        color: "#333333",
        bold: true,
        alignment: "right",
        marginBottom: 2,
        fontSize: 8,
      },
      subtitle3: {
        color: "#333333",
        width: "*",
        bold: true,
        alignment: "left",
        fontSize: 8,
      },
      table1: {
        fillColor: "#eaf2f5",
        margin: [0, 5, 0, 5],
        textTransform: "uppercase",
        fontSize: 10,
      },
      table2: {
        alignment: "left",
        margin: [0, 5, 0, 5],
        fontSize: 8,
      },
      table3: {
        fillColor: "#f5f5f5",
        alignment: "right",
        margin: [0, 5, 0, 5],
        fontSize: 8,
      },
      table4: {
        bold: true,
        fontSize: 10,
        alignment: "right",
        margin: [0, 5, 0, 5],
      },
      table5: {
        alignment: "right",
        margin: [0, 5, 0, 5],
        fontSize: 8,
      },
      text1: {
        fontSize: 8,
        bold: true,
        marginTop: 2,
      },
      text2: {
        fontSize: 8,
        bold: false,
        italics: true,
      },
    },
    defaultStyle: {
      columnGap: 20,
    },
  };

  const handleGeneratedPDF = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    // pdfMake.createPdf(individualProofPaymentPDF).download("COMPROBANTE-DE-PAGOS.pdf");
    pdfMake.createPdf(individualProofPaymentPDF).open();
  };

  return (
    <MDButton
      variant="text"
      size="medium"
      onClick={handleGeneratedPDF}
      sx={{ background: "#5499C7", "&:hover": { background: "#8CB0C8" } }}
    >
      <PictureAsPdfIcon />
    </MDButton>
  );
}
