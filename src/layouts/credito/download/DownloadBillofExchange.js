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
    pageMargins: [40, 40, 40, 40],
    background(currentPage) {
      return currentPage === 1
        ? [
            {
              canvas: [
                { type: "rect", x: 15, y: 15, w: 565, h: 300, r: 10, lineColor: "#000" },
                { type: "rect", x: 15, y: 330, w: 565, h: 470, r: 10, lineColor: "#000" },
              ],
            },
          ]
        : "";
    },
    content: [
      {
        stack: [
          {
            columns: [
              {
                text: [
                  "No: ",
                  { text: zfill(parseInt(clients[i].credits[i2].id, 10), 3), style: "text2" },
                ],
                style: "text1",
                width: 130,
              },
              {
                text: ["VENCE: ", { text: lastMonth, style: "text1" }],
                style: "text1",
                width: 200,
              },
              {
                text: ["POR: $ ", { text: clients[i].credits[i2].loanValue, style: "text1" }],
                style: "text1",
                width: "*",
              },
            ],
          },
        ],
      },
      "\n",
      {
        text: [
          "LUGAR Y FECHA: ",
          { text: controlInfo.city, style: "text3" },
          { text: " " },
          { text: nowDate, style: "text1" },
        ],
        style: "text1",
      },
      {
        text: [
          "A ",
          { text: days, style: "text1" },
          { text: " días se servirá(n) Ud(s), pagar por esta LETRA DE CAMBIO ", style: "text3" },
        ],
        style: "text1",
      },
      "\n",
      {
        text: [
          "A la orden de ",
          { text: `${clients[i].firstName} ${clients[i].lastName}`, style: "text1" },
        ],
        style: "text3",
      },
      {
        text: [
          "La cantidad de ",
          { text: clients[i].credits[i2].loanValue, style: "text1" },
          { text: " dólares de los Estados Unidos de América", style: "text1" },
        ],
        style: "text3",
      },
      "\n",
      {
        text: [
          "Con interés del __________% por ciento anual, desde ",
          { text: firstMonth, style: "text3" },
        ],
        style: "text3",
      },
      {
        text: "Sin protesto. Exímese de presentación para aceptación y pago; así como de avisos por falta de estos hechos.",
        style: "text3",
      },
      "\n\n",
      {
        stack: [
          {
            columns: [
              { text: "A:", style: "text1", width: 70 },
              {
                text: `${clients[i].firstName} ${clients[i].lastName}`,
                style: "text4",
                width: 170,
              },
              { text: "Atentamente", style: "text3" },
            ],
          },
          {
            columns: [
              { text: "Dirección:", style: "text1", width: 70 },
              [{ text: controlInfo.nameLocation, style: "text4" }],
            ],
          },
          {
            columns: [
              { text: "Ciudad:", style: "text1", width: 70 },
              { text: controlInfo.city, style: "text4", width: 170 },
              { text: "_________________________", style: "text3" },
            ],
          },
        ],
      },
      "\n",
      "\n\n",
      "\n\n",
      {
        text: [
          "ACEPTADA.- ",
          {
            text: "Valor recibido. El pago no podrá hacerse por partes ni aún por mi __________________________________________________ (nuestros) herederos. Me(nos) sujet(amos) a los jueces de esta ciudad y al trámite judicial que corresponda de acuerdo a la Ley, a la elección del demandante.",
            style: "text3",
          },
        ],
        style: "text1",
      },
      "\n",
      {
        text: [
          "Lugar y fecha: ",
          { text: controlInfo.city, style: "text1" },
          { text: " __________________________", style: "text3" },
        ],
        style: "text5",
      },
      "\n",
      { text: "__________________________", style: "text5" },
      { text: "Firma", style: "text5" },
      "\n",
      {
        text: [
          "POR AVAL ",
          {
            text: "Me(nos) constituyo(imos) solidariamente responsable(s) con _____________________. Sin protesto; el pago no podrá hacerse por partes ni aún por ____________________ herederos. Estipulo(amos) las demás condiciones constantes de la letra y de aceptación.",
            style: "text3",
          },
        ],
        style: "text1",
      },
      "\n",
      {
        text: [
          "Lugar y fecha: ",
          { text: controlInfo.city, style: "text1" },
          { text: " __________________________", style: "text3" },
        ],
        style: "text5",
      },
      "\n",
      {
        text: ["F. ", { text: "__________________________", style: "text3" }],
        style: "text5",
      },
      "\n",
      { text: "__________________________", style: "text5" },
      "\n",
      { text: controlInfo.nameSlogan, style: "text5" },
      {
        text: [
          "PÁGUESE a la orden de ",
          { text: `${clients[i].firstName} ${clients[i].lastName}`, style: "text3" },
          { text: " el valor de $ ", style: "text3" },
          { text: clients[i].credits[i2].loanValue, style: "text1" },
          { text: ". Sin Protesto. ", style: "text3" },
        ],
        style: "text3",
      },
      "\n",
      {
        text: [
          "Lugar y fecha: ",
          { text: controlInfo.city, style: "text1" },
          { text: " __________________________", style: "text3" },
        ],
        style: "text5",
      },
      "\n",
      { text: "__________________________", style: "text5" },
      { text: "Firma", style: "text5" },
    ],
    styles: {
      text1: {
        color: "black",
        bold: true,
        alignment: "left",
        marginBottom: 3,
        fontSize: 13,
      },
      text2: {
        fontSize: 12,
        bold: true,
        italics: true,
        color: "red",
      },
      text3: {
        fontSize: 12,
        bold: false,
        color: "black",
      },
      text4: {
        fontSize: 13,
        bold: false,
        color: "black",
      },
      text5: {
        fontSize: 12,
        bold: false,
        color: "black",
        alignment: "center",
      },
    },
    defaultStyle: {
      columnGap: 20,
    },
  };

  const handlePrintPDF = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(changeTablePDF).download("Letra-de-Cambio.pdf");
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
