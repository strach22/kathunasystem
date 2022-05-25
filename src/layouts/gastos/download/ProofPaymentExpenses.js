import React from "react";
import PropTypes from "prop-types";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import MDButton from "components/MDButton";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { numbToLetters } from "../helpers/numbToLetters";
import zfill from "../helpers/zfill";

export default function ProofPaymentExpenses({ info }) {
  const { id, expenseDate, expenseValue, observation } = info;

  const lettersExpenseValue = numbToLetters(expenseValue, {
    plural: "dólares estadounidenses",
    singular: "dólar estadounidense",
    centPlural: "centavos",
    centSingular: "centavo",
  });

  const handleGeneratedPDF = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const tablaAmortizacionSimulador = {
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
                text: "''SEMBRANDO EL FUTURO IMPULSANDO AL DESARROLLO''",
                color: "#333333",
                width: "*",
                fontSize: 15,
                bold: true,
                alignment: "center",
                margin: [0, 0, 0, 20],
              },
              {
                stack: [
                  {
                    columns: [
                      {
                        text: "Representante Legal",
                        color: "#aaaaab",
                        bold: true,
                        fontSize: 12,
                        alignment: "left",
                        margin: [0, 0, 0, 3],
                      },
                      {
                        text: "Recibo No.",
                        color: "#aaaaab",
                        bold: true,
                        width: "*",
                        fontSize: 12,
                        alignment: "right",
                      },
                      {
                        text: zfill(parseInt(id, 10), 5),
                        bold: true,
                        color: "#333333",
                        fontSize: 11,
                        alignment: "right",
                        width: 100,
                      },
                    ],
                  },
                  {
                    text: "Nombre del Representante Legal",
                    bold: true,
                    color: "#333333",
                    fontSize: 11,
                    alignment: "left",
                    margin: [10, 0, 0, 3],
                  },
                  {
                    columns: [
                      {
                        text: "Dirección",
                        color: "#aaaaab",
                        bold: true,
                        fontSize: 12,
                        alignment: "left",
                        margin: [0, 0, 0, 3],
                      },
                      {
                        text: "Fecha de Emisión",
                        color: "#aaaaab",
                        bold: true,
                        width: "*",
                        fontSize: 12,
                        alignment: "right",
                      },
                      {
                        text: expenseDate,
                        bold: true,
                        color: "#333333",
                        fontSize: 11,
                        alignment: "right",
                        width: 100,
                      },
                    ],
                  },
                  {
                    text: "SAN PABLITO",
                    color: "#333333",
                    width: "*",
                    fontSize: 11,
                    bold: true,
                    alignment: "left",
                    margin: [10, 0, 0, 3],
                  },
                ],
              },
            ],
          ],
        },
        {
          text: "_________________________________________________________________",
          style: "border",
        },
        {
          width: "100%",
          alignment: "center",
          text: "COMPROBANTE DE EGRESOS",
          bold: true,
          margin: [0, 10, 0, 2],
          fontSize: 15,
        },
        {
          width: "100%",
          alignment: "center",
          text: "GASTOS DE CAJA",
          bold: true,
          color: "red",
          margin: [0, 0, 0, 20],
          fontSize: 13,
        },
        {
          layout: {
            defaultBorder: false,
            hLineColor(i) {
              if (i === 1 || i === 0) {
                return "#bfdde8";
              }
              return "#eaeaea";
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
            widths: ["*", 80],
            body: [
              [
                {
                  text: "DETALLE",
                  fillColor: "#eaf2f5",
                  border: [false, true, false, true],
                  margin: [0, 5, 0, 5],
                  textTransform: "uppercase",
                },
                {
                  text: "VALOR",
                  border: [false, true, false, true],
                  alignment: "right",
                  fillColor: "#eaf2f5",
                  margin: [0, 5, 0, 5],
                  textTransform: "uppercase",
                },
              ],
              [
                {
                  text: observation,
                  border: [false, false, false, true],
                  margin: [0, 5, 0, 5],
                  alignment: "left",
                },
                {
                  border: [false, false, false, true],
                  text: `$ ${expenseValue}`,
                  fillColor: "#f5f5f5",
                  alignment: "right",
                  margin: [0, 5, 0, 5],
                },
              ],
              [
                {
                  text: "---",
                  border: [false, false, false, true],
                  margin: [0, 5, 0, 5],
                  alignment: "left",
                  color: "white",
                },
                {
                  text: "",
                  border: [false, false, false, true],
                  fillColor: "#f5f5f5",
                  alignment: "right",
                  margin: [0, 5, 0, 5],
                },
              ],
              [
                {
                  text: "---",
                  border: [false, false, false, true],
                  margin: [0, 5, 0, 5],
                  alignment: "left",
                  color: "white",
                },
                {
                  text: "",
                  border: [false, false, false, true],
                  fillColor: "#f5f5f5",
                  alignment: "right",
                  margin: [0, 5, 0, 5],
                },
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
                {
                  text: "Subtotal",
                  border: [false, true, false, true],
                  alignment: "right",
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, true, false, true],
                  text: `$ ${expenseValue}`,
                  alignment: "right",
                  fillColor: "#f5f5f5",
                  margin: [0, 5, 0, 5],
                },
              ],
              [
                {
                  text: "Impuestos",
                  border: [false, false, false, true],
                  alignment: "right",
                  margin: [0, 5, 0, 5],
                },
                {
                  text: "$ 0",
                  border: [false, false, false, true],
                  fillColor: "#f5f5f5",
                  alignment: "right",
                  margin: [0, 5, 0, 5],
                },
              ],
              [
                {
                  text: "Total",
                  bold: true,
                  fontSize: 20,
                  alignment: "right",
                  border: [false, false, false, true],
                  margin: [0, 5, 0, 5],
                },
                {
                  text: `$ ${expenseValue}`,
                  bold: true,
                  fontSize: 20,
                  alignment: "right",
                  border: [false, false, false, true],
                  fillColor: "#f5f5f5",
                  margin: [0, 5, 0, 5],
                },
              ],
            ],
          },
        },
        {
          text: [
            "La cantidad es: ",
            { text: lettersExpenseValue, fontSize: 10, bold: false, italics: true },
          ],
          fontSize: 10,
          bold: true,
          margin: [0, 25, 0, 60],
        },
        {
          text: "____________________________",
          style: "border",
        },
        {
          text: "Beneficiario",
          alignment: "center",
          fontSize: 10,
        },
      ],

      styles: {
        border: {
          fontSize: 15,
          bold: true,
          alignment: "center",
          color: "black",
          marginTop: 15,
          marginBottom: 15,
        },
      },
      defaultStyle: {
        columnGap: 20,
      },
    };

    pdfMake.createPdf(tablaAmortizacionSimulador).download();
    // pdfMake.createPdf(tablaAmortizacionSimulador).open();
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
