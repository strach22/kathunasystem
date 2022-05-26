import React from "react";
import { Grid } from "@mui/material";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import MDButton from "components/MDButton";

// eslint-disable-next-line react/prop-types
export default function PaymentExpensesHistory({ rows }) {
  // const { id, expenseDate, expenseValue, observation } = rows;
  console.log(rows);

  const handleGeneratedPDF = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const expensisHistory = {
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
                text: "HISTORIAL DE GASTOS",
                color: "#333333",
                width: "*",
                fontSize: 15,
                bold: true,
                alignment: "center",
              },
            ],
          ],
        },
        {
          text: "_________________________________________________________________",
          style: "border",
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
                  text: "CODIGO",
                  fillColor: "#eaf2f5",
                  border: [false, true, false, true],
                  margin: [0, 5, 0, 5],
                  textTransform: "uppercase",
                },
                {
                  text: "FECHA",
                  border: [false, true, false, true],
                  alignment: "right",
                  fillColor: "#eaf2f5",
                  margin: [0, 5, 0, 5],
                  textTransform: "uppercase",
                },
                {
                  text: "RAZÓN",
                  border: [false, true, false, true],
                  alignment: "right",
                  fillColor: "#eaf2f5",
                  margin: [0, 5, 0, 5],
                  textTransform: "uppercase",
                },
                {
                  text: "MONTO",
                  fillColor: "#eaf2f5",
                  border: [false, true, false, true],
                  margin: [0, 5, 0, 5],
                  textTransform: "uppercase",
                },
              ],
              [
                {
                  text: "observation",
                  border: [false, false, false, true],
                  margin: [0, 5, 0, 5],
                  alignment: "left",
                },
                {
                  border: [false, false, false, true],
                  text: "$ {expenseValue}",
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
                  text: "$ {expenseValue}",
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
                  text: "$ {expenseValue}",
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
            { text: "lettersExpenseValue", fontSize: 10, bold: false, italics: true },
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

    pdfMake.createPdf(expensisHistory).open();
  };

  return (
    <Grid container>
      <MDButton
        variant="text"
        size="medium"
        sx={{ background: "#5499C7", "&:hover": { background: "#8CB0C8" } }}
      >
        Excel
      </MDButton>
      <MDButton
        variant="text"
        size="medium"
        onClick={handleGeneratedPDF}
        sx={{ background: "#5499C7", "&:hover": { background: "#8CB0C8" } }}
      >
        PDF
      </MDButton>
      <MDButton
        variant="text"
        size="medium"
        sx={{ background: "#5499C7", "&:hover": { background: "#8CB0C8" } }}
      >
        Descargar
      </MDButton>
    </Grid>
  );
}
