/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable no-use-before-define */
/* eslint-disable default-case */
import React from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import MDButton from "components/MDButton";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

// eslint-disable-next-line react/prop-types
export default function ProofPaymentExpenses({ info }) {
  // eslint-disable-next-line react/prop-types
  const { id, expenseDate, expenseValue, observation } = info;

  const numbtoletters = (function () {
    function Unidades(num) {
      switch (num) {
        case 1:
          return "UN";
        case 2:
          return "DOS";
        case 3:
          return "TRES";
        case 4:
          return "CUATRO";
        case 5:
          return "CINCO";
        case 6:
          return "SEIS";
        case 7:
          return "SIETE";
        case 8:
          return "OCHO";
        case 9:
          return "NUEVE";
      }

      return "";
    } // Unidades()

    function Decenas(num) {
      const decena = Math.floor(num / 10);
      const unidad = num - decena * 10;

      switch (decena) {
        case 1:
          switch (unidad) {
            case 0:
              return "DIEZ";
            case 1:
              return "ONCE";
            case 2:
              return "DOCE";
            case 3:
              return "TRECE";
            case 4:
              return "CATORCE";
            case 5:
              return "QUINCE";
            default:
              return `DIECI${Unidades(unidad)}`;
          }
        case 2:
          switch (unidad) {
            case 0:
              return "VEINTE";
            default:
              return `VEINTI${Unidades(unidad)}`;
          }
        case 3:
          return DecenasY("TREINTA", unidad);
        case 4:
          return DecenasY("CUARENTA", unidad);
        case 5:
          return DecenasY("CINCUENTA", unidad);
        case 6:
          return DecenasY("SESENTA", unidad);
        case 7:
          return DecenasY("SETENTA", unidad);
        case 8:
          return DecenasY("OCHENTA", unidad);
        case 9:
          return DecenasY("NOVENTA", unidad);
        case 0:
          return Unidades(unidad);
      }
    } // Unidades()

    function DecenasY(strSin, numUnidades) {
      if (numUnidades > 0) return `${strSin} Y ${Unidades(numUnidades)}`;

      return strSin;
    } // DecenasY()

    function Centenas(num) {
      const centenas = Math.floor(num / 100);
      const decenas = num - centenas * 100;

      switch (centenas) {
        case 1:
          if (decenas > 0) return `CIENTO ${Decenas(decenas)}`;
          return "CIEN";
        case 2:
          return `DOSCIENTOS ${Decenas(decenas)}`;
        case 3:
          return `TRESCIENTOS ${Decenas(decenas)}`;
        case 4:
          return `CUATROCIENTOS ${Decenas(decenas)}`;
        case 5:
          return `QUINIENTOS ${Decenas(decenas)}`;
        case 6:
          return `SEISCIENTOS ${Decenas(decenas)}`;
        case 7:
          return `SETECIENTOS ${Decenas(decenas)}`;
        case 8:
          return `OCHOCIENTOS ${Decenas(decenas)}`;
        case 9:
          return `NOVECIENTOS ${Decenas(decenas)}`;
      }

      return Decenas(decenas);
    } // Centenas()

    function Seccion(num, divisor, strSingular, strPlural) {
      const cientos = Math.floor(num / divisor);
      const resto = num - cientos * divisor;

      let letras = "";

      if (cientos > 0)
        if (cientos > 1) letras = `${Centenas(cientos)} ${strPlural}`;
        else letras = strSingular;

      if (resto > 0) letras += "";

      return letras;
    } // Seccion()

    function Miles(num) {
      const divisor = 1000;
      const cientos = Math.floor(num / divisor);
      const resto = num - cientos * divisor;

      const strMiles = Seccion(num, divisor, "UN MIL", "MIL");
      const strCentenas = Centenas(resto);

      if (strMiles === "") return strCentenas;

      return `${strMiles} ${strCentenas}`;
    } // Miles()

    function Millones(num) {
      const divisor = 1000000;
      const cientos = Math.floor(num / divisor);
      const resto = num - cientos * divisor;

      const strMillones = Seccion(num, divisor, "UN MILLON DE", "MILLONES DE");
      const strMiles = Miles(resto);

      if (strMillones === "") return strMiles;

      return `${strMillones} ${strMiles}`;
    } // Millones()

    return function NumeroALetras(num, currency) {
      currency = currency || {};
      const data = {
        numero: num,
        enteros: Math.floor(num),
        centavos: Math.round(num * 100) - Math.floor(num) * 100,
        letrasCentavos: "",
        letrasMonedaPlural: currency.plural || "PESOS CHILENOS", // 'PESOS', 'Dólares', 'Bolívares', 'etcs'
        letrasMonedaSingular: currency.singular || "PESO CHILENO", // 'PESO', 'Dólar', 'Bolivar', 'etc'
        letrasMonedaCentavoPlural: currency.centPlural || "CHIQUI PESOS CHILENOS",
        letrasMonedaCentavoSingular: currency.centSingular || "CHIQUI PESO CHILENO",
      };

      if (data.centavos > 0) {
        data.letrasCentavos = `CON ${(function () {
          if (data.centavos === 1)
            return `${Millones(data.centavos)} ${data.letrasMonedaCentavoSingular}`;
          return `${Millones(data.centavos)} ${data.letrasMonedaCentavoPlural}`;
        })()}`;
      }

      if (data.enteros === 0) return `CERO ${data.letrasMonedaPlural} ${data.letrasCentavos}`;
      if (data.enteros === 1)
        return `${Millones(data.enteros)} ${data.letrasMonedaSingular} ${data.letrasCentavos}`;
      return `${Millones(data.enteros)} ${data.letrasMonedaPlural} ${data.letrasCentavos}`;
    };
  })();

  const lettersExpenseValue = numbtoletters(expenseValue, {
    plural: "dólares estadounidenses",
    singular: "dólar estadounidense",
    centPlural: "centavos",
    centSingular: "centavo",
  });

  function zfill(number, width) {
    const numberOutput = Math.abs(number);
    const { length } = number.toString();
    const zero = "0";

    if (width <= length) {
      if (number < 0) {
        return `-${numberOutput.toString()}`;
      }
      return numberOutput.toString();
    }
    if (number < 0) {
      return `-${zero.repeat(width - length)}${numberOutput.toString()}`;
    }
    return zero.repeat(width - length) + numberOutput.toString();
  }

  const handleGeneratedPDF = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const tablaAmortizacionSimulador = {
      pageMargins: [40, 40, 40, 80],
      content: [
        // { text: "COMPROBANTE DE EGRESOS", style: "secundaryTitle" },
        // { text: "GASTOS DE CAJA", style: "secundaryTitle", color: "red" },
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
          style: "notesText",
        },
      ],

      //   styles: {
      //     header: {
      //       border: [true, true, true, true],
      //       fillColor: "#eeffee",
      //     },
      //     principalTitle: {
      //       alignment: "center",
      //       color: "black",
      //       fontSize: 12,
      //       bold: true,
      //       lineHeight: 1.25,
      //     },
      //     secundaryTitle: {
      //       alignment: "center",
      //       color: "black",
      //       fontSize: 10,
      //       bold: true,
      //     },
      //     rowData: {
      //       fontSize: 10,
      //       bold: true,
      //       alignment: "left",
      //       color: "black",
      //     },
      //     rowDataResp: {
      //       fontSize: 9,
      //       alignment: "left",
      //       color: "#424141",
      //     },
      //   },
      styles: {
        border: {
          fontSize: 15,
          bold: true,
          alignment: "center",
          color: "black",
          marginTop: 15,
          marginBottom: 15,
        },
        notesTitle: {
          fontSize: 10,
          bold: true,
          margin: [0, 50, 0, 3],
        },
        notesText: {
          fontSize: 10,
        },
      },
      defaultStyle: {
        columnGap: 20,
        // font: 'Quicksand',
      },
    };

    // pdfMake.createPdf(tablaAmortizacionSimulador).download();
    pdfMake.createPdf(tablaAmortizacionSimulador).open();
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
