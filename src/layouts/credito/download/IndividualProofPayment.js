/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import MDButton from "components/MDButton";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import ClientsContext from "context/Clients/ClientsContext";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import zfill from "elements/helpers/zfill";
import { numbToLetters } from "elements/helpers/numbToLetters";
import { useParams } from "react-router-dom";

export default function IndividualProofPayment({ info }) {
  const { id, value, transactionDate, observation, receipt } = info;

  const { clients, controlInfo } = useContext(ClientsContext);
  const { id: nowId } = useParams();

  const [idC, idF] = nowId.split("-");
  const i = clients.map((e) => e.id).indexOf(idC);
  const i2 = clients[i].credits.map((e) => e.id).indexOf(idF);

  const lettersExpenseValue = numbToLetters(value, {
    plural: "dólares estadounidenses",
    singular: "dólar estadounidense",
    centPlural: "centavos",
    centSingular: "centavo",
  });

  const individualProofPaymentPDF = {
    pageMargins: [40, 40, 40, 80],
    background(currentPage) {
      return currentPage === 1
        ? [
            {
              canvas: [
                { type: "rect", x: 15, y: 15, w: 565, h: 250, r: 10, lineColor: "#000" },
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
            { text: controlInfo.nameBank, style: "title1", fontSize: 16 },
            { text: `''${controlInfo.nameSlogan}''`, style: "title1", marginBottom: 30 },
            {
              stack: [
                {
                  columns: [
                    { text: "Representante Legal", style: "subtitle1", width: 112 },
                    { text: controlInfo.legalRepresentative, style: "subtitle3", width: "*" },
                    { text: "Recibo No.", style: "subtitle1", width: 95 },
                    { text: zfill(receipt, 4), style: "subtitle2", width: 60 },
                  ],
                },
                {
                  columns: [
                    { text: "Dirección", style: "subtitle1", width: 112 },
                    { text: controlInfo.nameLocation, style: "subtitle3", width: "*" },
                    { text: "Fecha de Emisión", style: "subtitle1", width: 95 },
                    { text: transactionDate, style: "subtitle2", width: 60 },
                  ],
                },
                {
                  columns: [
                    { text: "Crédito a Pagar", style: "subtitle1", width: 112 },
                    {
                      text: `$ ${clients[i].credits[i2].actualLoan}`,
                      style: "subtitle3",
                      width: "*",
                    },
                    { text: "Total de Cuotas", style: "subtitle1", width: 95 },
                    {
                      text: zfill(parseInt(clients[i].credits[i2].periods, 10), 3),
                      style: "subtitle2",
                      width: 60,
                    },
                  ],
                },
              ],
            },
            { text: "HISTORIAL DE CUOTAS DE CRÉDITO", style: "title1", marginTop: 35 },
            { text: "COMPROBANTE DE PAGOS", style: "title1", color: "red" },
            {
              text: [
                "CARPETA: ",
                {
                  text: zfill(parseInt(clients[i].credits[i2].id, 10), 3),
                  style: "title2",
                  italics: true,
                },
              ],
              style: "title2",
              color: "black",
            },
          ],
        ],
      },
      "\n",
      "\n\n",
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
            return 2;
          },
          paddingBottom() {
            return 2;
          },
          fillColor() {
            return "#fff";
          },
        },
        table: {
          headerRows: 1,
          widths: ["*", 100],
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
              { text: "---", style: "table2", color: "white", border: [false, false, false, true] },
              { text: "", style: "table3", border: [false, false, false, true] },
            ],
          ],
        },
      },
      "\n",
      "\n\n",
      {
        layout: {
          defaultBorder: false,
          hLineWidth() {
            return 1;
          },
          vLineWidth() {
            return 1;
          },
          hLineColor() {
            return "#eaeaea";
          },
          vLineColor() {
            return "#eaeaea";
          },
          paddingLeft() {
            return 10;
          },
          paddingRight() {
            return 10;
          },
          paddingTop() {
            return 3;
          },
          paddingBottom() {
            return 3;
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
      "\n",
      {
        text: ["La cantidad es: ", { text: lettersExpenseValue, style: "text2" }],
        style: "text1",
      },
      {
        text: ["Observación: ", { text: observation, style: "text2" }],
        style: "text1",
      },
      "\n\n",
      "\n\n",
      "\n\n",
      { text: "____________________________", style: "border" },
      { text: "Beneficiario", alignment: "center", fontSize: 10 },
    ],

    styles: {
      border: {
        fontSize: 15,
        bold: true,
        alignment: "center",
        marginBottom: 5,
      },
      title1: {
        color: "#333333",
        width: "*",
        bold: true,
        alignment: "center",
        marginBottom: 3,
        fontSize: 14,
      },
      title2: {
        color: "red",
        width: "*",
        alignment: "center",
        marginBottom: 3,
        fontSize: 12,
      },
      subtitle1: {
        color: "#aaaaab",
        bold: true,
        fontSize: 12,
        alignment: "left",
        marginBottom: 3,
      },
      subtitle2: {
        bold: true,
        color: "#333333",
        fontSize: 11,
        alignment: "right",
      },
      subtitle3: {
        bold: true,
        color: "#333333",
        fontSize: 11,
        alignment: "left",
      },
      table1: {
        fillColor: "#eaf2f5",
        margin: [0, 5, 0, 5],
        textTransform: "uppercase",
        fontSize: 14,
      },
      table2: {
        alignment: "left",
        margin: [0, 5, 0, 5],
        fontSize: 12,
      },
      table3: {
        fillColor: "#f5f5f5",
        alignment: "right",
        margin: [0, 5, 0, 5],
        fontSize: 12,
      },
      table4: {
        bold: true,
        fontSize: 20,
        alignment: "right",
        margin: [0, 5, 0, 5],
      },
      table5: {
        alignment: "right",
        margin: [0, 5, 0, 5],
        fontSize: 12,
      },
      text1: {
        fontSize: 10,
        bold: true,
        marginBottom: 5,
      },
      text2: {
        fontSize: 10,
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
    pdfMake.createPdf(individualProofPaymentPDF).download("COMPROBANTE-DE-PAGOS.pdf");
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
