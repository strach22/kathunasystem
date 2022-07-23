import React, { useContext } from "react";
import PropTypes from "prop-types";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import MDButton from "components/MDButton";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import zfill from "elements/helpers/zfill";
import ClientsContext from "context/Clients/ClientsContext";
import { numbToLetters } from "elements/helpers/numbToLetters";

export default function ProofPaymentExpenses({ info }) {
  const { id, expenseDate, expenseValue, observation } = info;
  const { controlInfo } = useContext(ClientsContext);

  const lettersExpenseValue = numbToLetters(expenseValue, {
    plural: "dólares estadounidenses",
    singular: "dólar estadounidense",
    centPlural: "centavos",
    centSingular: "centavo",
  });

  const proofPaymentExpensesPDF = {
    pageSize: "A6",
    pageMargins: [30, 10, 30, 0],
    background(currentPage) {
      return currentPage === 1
        ? [
            {
              canvas: [
                { type: "rect", x: 15, y: 5, w: 267, h: 130, r: 10, lineColor: "#000" },
                { type: "line", x1: 60, y1: 50, x2: 237, y2: 50, lineWidth: 2.5 },
                { type: "line", x1: 60, y1: 100, x2: 237, y2: 100, lineWidth: 2.5 },
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
                    { text: "Representante", style: "subtitle1", width: 34 },
                    { text: controlInfo.legalRepresentative, style: "subtitle3" },
                    { text: "Recibo No.", style: "subtitle1", width: 39 },
                    { text: zfill(id, 4), style: "subtitle2", width: 43 },
                  ],
                },
                {
                  columns: [
                    { text: "RUC", style: "subtitle1", width: 34 },
                    { text: controlInfo.ruc, style: "subtitle3" },
                    { text: "Fecha", style: "subtitle1", width: 39 },
                    { text: expenseDate, style: "subtitle2", width: 43 },
                  ],
                },
              ],
            },
            { text: "GASTOS DE CAJA", style: "title1", marginTop: 15 },
            { text: "COMPROBANTE DE EGRESO", style: "title1", color: "red" },
          ],
        ],
      },
      "\n\n",
      {
        layout: {
          defaultBorder: false,
          hLineColor(i) {
            return i === 0 || i === 1 ? "#bfdde8" : "#eaeaea";
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
              { text: observation, style: "table2", border: [false, false, false, true] },
              { text: `$ ${expenseValue}`, style: "table3", border: [false, false, false, true] },
            ],
            [
              { text: "---", style: "table2", color: "white", border: [false, false, false, true] },
              { text: "", style: "table3", border: [false, false, false, true] },
            ],
            [
              { text: "Subtotal", style: "table5", border: [false, true, false, true] },
              { text: `$ ${expenseValue}`, style: "table3", border: [false, true, false, true] },
            ],
            [
              { text: "Impuestos", style: "table5", border: [false, false, false, true] },
              { text: "$ 0", style: "table3", border: [false, false, false, true] },
            ],
            [
              { text: "Total", style: "table4", border: [false, false, false, true] },
              {
                text: `$ ${expenseValue}`,
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
        margin: [0, 5, 0, 5],
        alignment: "left",
        fontSize: 8,
      },
      table3: {
        fillColor: "#f5f5f5",
        margin: [0, 5, 0, 5],
        alignment: "right",
        fontSize: 8,
      },
      table4: {
        margin: [0, 5, 0, 5],
        bold: true,
        alignment: "right",
        fontSize: 10,
      },
      table5: {
        margin: [0, 5, 0, 5],
        alignment: "right",
        fontSize: 8,
      },
      text1: {
        bold: true,
        marginBottom: 2,
        fontSize: 8,
      },
      text2: {
        bold: false,
        italics: true,
        fontSize: 8,
      },
    },
    defaultStyle: {
      columnGap: 20,
    },
  };

  const handleGeneratedPDF = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(proofPaymentExpensesPDF).download("COMPROBANTE-DE-PAGOS.pdf");
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

ProofPaymentExpenses.propTypes = {
  info: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      expenseDate: PropTypes.string.isRequired,
      expenseValue: PropTypes.string.isRequired,
      observation: PropTypes.string.isRequired,
    })
  ).isRequired,
};
