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

  const auxInitialMonth = new Date(clients[i].credits[i2].initialDate);
  const nowDate = new Date().toISOString().split("T")[0].replace("-", "/").replace("-", "/");

  const auxLastMonth = auxInitialMonth;
  const auxFirstMonth = auxInitialMonth;

  auxLastMonth.setMonth(auxLastMonth.getMonth() + parseInt(clients[i].credits[i2].periods, 10));
  auxFirstMonth.setMonth(auxFirstMonth.getMonth() + 1);

  const lastMonth = auxLastMonth.toISOString().split("T")[0].replace("-", "/").replace("-", "/");
  const firstMonth = auxFirstMonth.toISOString().split("T")[0].replace("-", "/").replace("-", "/");

  const auxDate1 = clients[i].credits[i2].initialDate.split("/");
  const auxDate2 = lastMonth.split("/");
  const utcDate1 = Date.UTC(auxDate1[0], auxDate1[1] - 1, auxDate1[2]);
  const utcDate2 = Date.UTC(auxDate2[0], auxDate2[1] - 1, auxDate2[2]);
  const difference = utcDate2 - utcDate1;
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

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
                          style: "text1",
                        },
                      ],
                      style: "title",
                      fontSize: 10,
                    },
                    {
                      text: ["VENCE: ", { text: lastMonth, style: "subtitle2" }],
                      style: "title",
                      fontSize: 10,
                    },
                    {
                      text: [
                        "POR: ",
                        { text: clients[i].credits[i2].loanValue, style: "subtitle2" },
                      ],
                      style: "title",
                      fontSize: 10,
                    },
                  ],
                },
              ],
            },
          ],
        ],
      },
      {
        text: [
          "LUGAR Y FECHA: ",
          { text: controlInfo.city, style: "subtitle2" },
          { text: " ", style: "subtitle2" },
          { text: nowDate, style: "subtitle2" },
        ],
        style: "title",
        fontSize: 10,
      },
      {
        text: [
          "A ",
          { text: days, style: "subtitle2" },
          {
            text: " días se servirá(n) Ud(s), pagar por esta LETRA DE CAMBIO ",
            style: "subtitle2",
          },
        ],
        style: "title",
        fontSize: 10,
      },
      {
        text: [
          "A la orden de ",
          { text: `${clients[i].firstName} ${clients[i].lastName}`, style: "subtitle2" },
        ],
        style: "title",
        fontSize: 10,
      },
      {
        text: [
          "La cantidad de ",
          { text: clients[i].credits[i2].loanValue, style: "subtitle2" },
          { text: " dólares de los Estados Unidos de América", style: "subtitle2" },
        ],
        style: "title",
        fontSize: 10,
      },
      {
        text: [
          "Con interés del __________% por ciento anual, desde ",
          { text: firstMonth, style: "subtitle2" },
        ],
        style: "title",
        fontSize: 10,
      },
      {
        text: "Sin protesto. Exímese de presentación para aceptación y pago; así como de avisos por falta de estos hechos.",
        style: "title2",
      },
      {
        columns: [
          [
            {
              stack: [
                {
                  columns: [
                    { text: "A:", style: "title", fontSize: 12 },
                    {
                      text: `${clients[i].firstName} ${clients[i].lastName}`,
                      style: "title",
                      fontSize: 12,
                    },
                    { text: "Atentamente", style: "title", fontSize: 12 },
                  ],
                },
                {
                  columns: [
                    { text: "Dirección:", style: "title", fontSize: 12 },
                    {
                      text: controlInfo.nameLocation,
                      style: "title",
                      fontSize: 12,
                    },
                    {},
                  ],
                },
                {
                  columns: [
                    { text: "Ciudad:", style: "title", fontSize: 12 },
                    {
                      text: controlInfo.city,
                      style: "title",
                      fontSize: 12,
                    },
                    { text: "________________", style: "title", fontSize: 12 },
                  ],
                },
              ],
            },
          ],
        ],
      },
    ],
    styles: {
      text1: {
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
