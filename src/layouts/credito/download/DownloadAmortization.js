import React, { useContext } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import MDButton from "components/MDButton";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ClientsContext from "context/Clients/ClientsContext";
import zfill from "layouts/gastos/helpers/zfill";
import { useParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function DownloadAmortization({ info }) {
  const { clients, controlInfo } = useContext(ClientsContext);
  const { numId } = useParams();
  const i = clients.map((e) => e.numId).indexOf(numId);

  // eslint-disable-next-line react/prop-types
  const { id, initialDate, loanValue, monthlyPayment, periods, interest } = info;

  const amortizationTablePDF = {
    pageMargins: [40, 40, 40, 80],
    background() {
      return [
        {
          canvas: [
            { type: "line", x1: 15, y1: 10, x2: 585, y2: 10, lineWidth: 1 }, // Up line
            { type: "line", x1: 15, y1: 10, x2: 15, y2: 830, lineWidth: 1 }, // Left line
            { type: "line", x1: 15, y1: 830, x2: 585, y2: 830, lineWidth: 1 }, // Bottom line
            { type: "line", x1: 585, y1: 10, x2: 585, y2: 830, lineWidth: 1 }, // Rigth line
          ],
        },
      ];
    },
    content: [
      {
        columns: [
          [
            {
              text: controlInfo.nameBank,
              color: "#333333",
              width: "*",
              fontSize: 18,
              bold: true,
              alignment: "center",
              margin: [0, 0, 0, 3],
            },
            {
              text: `''${controlInfo.nameSlogan}''`,
              color: "#333333",
              width: "*",
              fontSize: 15,
              bold: true,
              alignment: "center",
              margin: [0, 0, 0, 3],
            },
            {
              text: controlInfo.nameLocation,
              color: "#333333",
              width: "*",
              fontSize: 12,
              bold: true,
              alignment: "center",
              margin: [10, 0, 0, 25],
            },
            {
              text: "TIPO",
              color: "#333333",
              width: "*",
              fontSize: 15,
              bold: true,
              alignment: "center",
            },
            {
              text: "TABLA DE AMORTIZACIÓN",
              color: "red",
              width: "*",
              fontSize: 13,
              bold: true,
              alignment: "center",
            },
            {
              text: [
                "CARPETA: ",
                {
                  text: zfill(parseInt(id, 10), 3),
                  fontSize: 14,
                  bold: true,
                  italics: true,
                  color: "red",
                },
              ],
              color: "#333333",
              width: "*",
              fontSize: 14,
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
        columns: [
          [
            {
              stack: [
                {
                  columns: [
                    { text: "Cliente:", style: "Col1" },
                    { text: `${clients[i].firstName} ${clients[i].lastName}`, style: "Col2" },
                    { text: "Fecha:", style: "Col3" },
                    { text: initialDate, style: "Col4" },
                  ],
                },
                {
                  columns: [
                    { text: "RUC:", style: "Col1" },
                    { text: clients[i].identification, style: "Col2" },
                    { text: "Teléfono:", style: "Col3" },
                    { text: clients[i].mobile, style: "Col4" },
                  ],
                },
                {
                  columns: [
                    { text: "Dirección:", style: "Col1" },
                    { text: clients[i].address, style: "Col2" },
                  ],
                },
                {
                  columns: [
                    { text: "Valor Préstamo:", style: "Col1" },
                    { text: loanValue, style: "Col2" },
                    { text: "Valor  Cuota:", style: "Col3" },
                    { text: monthlyPayment, style: "Col4" },
                  ],
                },
                {
                  columns: [
                    { text: "Número de Cuotas:", style: "Col1" },
                    { text: periods, style: "Col2" },
                    { text: "Total Interés:", style: "Col3" },
                    { text: interest, style: "Col4" },
                  ],
                },
              ],
            },
          ],
        ],
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
      Col1: {
        color: "#aaaaab",
        bold: true,
        fontSize: 12,
        alignment: "left",
        margin: [0, 0, 0, 3],
        width: 100,
      },
      Col2: {
        color: "#aaaaab",
        bold: true,
        width: "*",
        fontSize: 12,
        alignment: "right",
      },
      Col3: {
        bold: true,
        color: "#333333",
        fontSize: 11,
        alignment: "right",
        width: 100,
      },
      Col4: {
        bold: true,
        color: "#333333",
        fontSize: 11,
        alignment: "right",
        width: 100,
      },
    },
    defaultStyle: {
      columnGap: 20,
    },
  };

  const handleGeneratedPDF = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(amortizationTablePDF).open();
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
