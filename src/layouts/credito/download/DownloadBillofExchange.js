import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Grid } from "@mui/material";
import MDButton from "components/MDButton";
import ClientsContext from "context/Clients/ClientsContext";
import zfill from "layouts/gastos/helpers/zfill";

export default function DownloadBillofExchange() {
  const { clients, controlInfo } = useContext(ClientsContext);
  const { id } = useParams();

  const [idC, idF] = id.split("-");
  const i = clients.map((e) => e.id).indexOf(idC);
  const i2 = clients[i].credits.map((e) => e.id).indexOf(idF);

  console.log(clients[i].credits[i2].initialDate);
  console.log(clients[i].credits[i2].periods);

  const changeTablePDF = {
    pageMargins: [40, 40, 40, 80],
    background(currentPage) {
      return currentPage === 1
        ? [
            {
              canvas: [{ type: "rect", x: 15, y: 15, w: 565, h: 305, r: 10, lineColor: "#000" }],
            },
          ]
        : "";
    },
    content: [
      {
        columns: [
          [
            {
              stack: [
                {
                  columns: [
                    {
                      text: [
                        "No: ",
                        {
                          text: zfill(parseInt(clients[i].credits[i2].id, 10), 3),
                          style: "subtitle2",
                        },
                      ],
                      style: "title",
                      fontSize: 10,
                    },
                    {
                      text: [
                        "VENCE: ",
                        {
                          text: zfill(parseInt(clients[i].credits[i2].id, 10), 3),
                          style: "subtitle2",
                        },
                      ],
                      style: "title",
                      fontSize: 10,
                    },
                    { text: "Fecha:", style: "Col1", width: 80 },
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
                    { text: clients[i].credits[i2].loanValue, style: "Col2" },
                    { text: "Valor  Cuota:", style: "Col1", width: 80 },
                    { text: clients[i].credits[i2].monthlyPayment, style: "Col2", width: 80 },
                  ],
                },
                {
                  columns: [
                    { text: "Número de Cuotas:", style: "Col1", width: 95, marginBottom: 80 },
                    { text: clients[i].credits[i2].periods, style: "Col2" },
                    { text: "Total Interés:", style: "Col1", width: 80 },
                    { text: clients[i].credits[i2].interest, style: "Col2", width: 80 },
                  ],
                },
              ],
            },
          ],
        ],
      },
      {
        columns: [
          [
            { text: controlInfo.nameBank, style: "title", fontSize: 14 },
            {
              text: `''${controlInfo.nameSlogan}''`,
              style: "title",
              fontSize: 12,
            },
            { text: controlInfo.nameLocation, style: "title2" },
            { text: "TIPO", style: "title", fontSize: 12 },
            { text: "TABLA DE AMORTIZACIÓN", style: "subtitle" },
            {
              text: [
                "CARPETA: ",
                { text: zfill(parseInt(clients[i].credits[i2].id, 10), 3), style: "subtitle2" },
              ],
              style: "title",
              fontSize: 10,
            },
          ],
        ],
      },
      "\n",
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
                    { text: "Fecha:", style: "Col1", width: 80 },
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
                    { text: clients[i].credits[i2].loanValue, style: "Col2" },
                    { text: "Valor  Cuota:", style: "Col1", width: 80 },
                    { text: clients[i].credits[i2].monthlyPayment, style: "Col2", width: 80 },
                  ],
                },
                {
                  columns: [
                    { text: "Número de Cuotas:", style: "Col1", width: 95, marginBottom: 80 },
                    { text: clients[i].credits[i2].periods, style: "Col2" },
                    { text: "Total Interés:", style: "Col1", width: 80 },
                    { text: clients[i].credits[i2].interest, style: "Col2", width: 80 },
                  ],
                },
              ],
            },
          ],
        ],
      },
    ],
    styles: {
      title: {
        color: "#333333",
        width: "*",
        bold: true,
        alignment: "center",
        margin: [0, 0, 0, 3],
      },
      title2: {
        color: "#333333",
        width: "*",
        fontSize: 10,
        bold: true,
        alignment: "center",
        margin: [10, 0, 0, 25],
      },
      subtitle: {
        color: "red",
        width: "*",
        fontSize: 10,
        bold: true,
        alignment: "center",
      },
      subtitle2: {
        fontSize: 10,
        bold: true,
        italics: true,
        color: "red",
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
      signature1: {
        alignment: "center",
        bold: false,
        color: "black",
        fontSize: 10,
        marginBottom: 1,
      },
      signature2: {
        alignment: "center",
        bold: true,
        color: "black",
        fontSize: 10,
        marginBottom: 1,
      },
    },
    defaultStyle: {
      columnGap: 20,
    },
  };

  const handlePrintPDF = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(changeTablePDF).open();
  };

  return (
    <Grid container>
      <MDButton
        variant="text"
        size="medium"
        onClick={handlePrintPDF}
        sx={{ background: "#7B809A", "&:hover": { background: "#99A3A4" } }}
      >
        Descargar
      </MDButton>
    </Grid>
  );
}
