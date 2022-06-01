import React, { useState, useEffect, useContext } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import MDButton from "components/MDButton";
import ClientsContext from "context/Clients/ClientsContext";
import zfill from "layouts/gastos/helpers/zfill";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";

export default function DownloadAmortization() {
  const [relationShip, setRelationShip] = useState({ name: "", type: "", ci: "" });
  const [aux1, setAux1] = useState(false);
  const { clients, controlInfo } = useContext(ClientsContext);
  const { id } = useParams();

  const [idC, idF] = id.split("-");
  const i = clients.map((e) => e.id).indexOf(idC);
  const i2 = clients[i].credits.map((e) => e.id).indexOf(idF);

  useEffect(() => {
    if (clients[i].identificationSpouse) {
      setRelationShip({
        name: `${clients[i].firstNameSpouse} ${clients[i].lastNameSpouse}`,
        type: "CONYUGUE",
        ci: clients[i].identificationSpouse,
      });
    } else {
      setRelationShip({
        name: `${clients[i].firstNameRelationShip} ${clients[i].lastNameRelationShip}`,
        type: clients[i].relationShip,
        ci: "Poner CI Parentesco",
      });
    }
  }, [aux1]);
  let { loanValue, interest, periods } = clients[i].credits[i2];
  loanValue = parseFloat(loanValue);
  interest = parseFloat(interest) / 100;
  periods = parseFloat(periods);
  const periodicFee = loanValue * (interest / (1 - (interest + 1) ** -periods));
  const desgravamen = +((controlInfo.desgravament / 100) * loanValue) / periods;
  const periodicFeeDesgravamen = periodicFee + desgravamen;
  let periodInteres = loanValue * interest;
  let amortizedCapital = periodicFee - periodInteres;
  let residue = loanValue - amortizedCapital;
  const rows = [];
  for (let j = 1; j < periods + 1; j += 1) {
    if (j === 1) {
      rows.push({
        cuota: "0",
        saldo: loanValue,
        interesPeriodo: " ",
        capitalAmortizado: " ",
        desgravamen: " ",
        valorCuota: " ",
      });
    }
    rows.push({
      cuota: String(j),
      interesPeriodo: periodInteres.toFixed(2),
      capitalAmortizado: amortizedCapital.toFixed(2),
      desgravamen: desgravamen.toFixed(2),
      valorCuota: periodicFeeDesgravamen.toFixed(2),
      saldo: Math.abs(residue).toFixed(2),
    });
    periodInteres = residue * interest;
    amortizedCapital = periodicFee - periodInteres;
    residue -= amortizedCapital;
  }

  function buildTableBody(data, columns) {
    const body = [];

    const auxColumns = [
      { text: "Periodo", style: "table1", marginTop: 7 },
      { text: "Interes Periodo", style: "table1" },
      { text: "Capital Amortizado", style: "table1" },
      { text: "Desgravamen", style: "table1", marginTop: 7 },
      { text: "Valor Cuota", style: "table1" },
      { text: "Saldo", style: "table1", marginTop: 7 },
    ];

    body.push(auxColumns);

    data.forEach((row) => {
      const dataRow = [];

      columns.forEach((column) => {
        dataRow.push({
          text: row[column].toString(),
          alignment: "center",
          color: "black",
          fontSize: 10,
        });
      });

      body.push(dataRow);
    });

    return body;
  }

  const amortizationTablePDF = {
    pageMargins: [40, 40, 40, 80],
    background(currentPage) {
      return currentPage === 1
        ? [
            {
              canvas: [
                { type: "rect", x: 15, y: 15, w: 565, h: 305, r: 10, lineColor: "#000" },
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
      {
        layout: {
          hLineWidth(val, node) {
            return val === 0 || val === node.table.body.length ? 2 : 1;
          },
          vLineWidth(val, node) {
            return val === 0 || val === node.table.widths.length ? 2 : 1;
          },
          hLineColor(val, node) {
            return val === 0 || val === node.table.body.length ? "black" : "gray";
          },
          vLineColor(val, node) {
            return val === 0 || val === node.table.widths.length ? "black" : "gray";
          },
          fillColor(rowIndex) {
            if (rowIndex === 0) return "#3d5662";
            return rowIndex % 2 === 0 ? "#e6fbff" : "#c6e6f5";
          },
          paddingLeft() {
            return 10;
          },
          paddingRight() {
            return 10;
          },
          paddingTop() {
            return 5;
          },
          paddingBottom() {
            return 5;
          },
          marginTop() {
            return 40;
          },
        },
        table: {
          headerRows: 1,
          widths: [45, 73, 70, 79, 60, 60],
          body: buildTableBody(rows, [
            "cuota",
            "interesPeriodo",
            "capitalAmortizado",
            "desgravamen",
            "valorCuota",
            "saldo",
          ]),
        },
      },
      {
        columns: [
          [
            {
              stack: [
                {
                  columns: [
                    { text: "____________________________", width: 163, marginTop: 70 },
                    { text: "____________________________", width: 163, marginTop: 70 },
                    { text: "____________________________", width: 163, marginTop: 70 },
                  ],
                },
                {
                  columns: [
                    {
                      text: ["Sr.(a) ", { text: `${clients[i].firstName} ${clients[i].lastName}` }],
                      width: 163,
                      style: "signature1",
                    },
                    {
                      text: ["Sr.(a) ", { text: relationShip.name }],
                      width: 163,
                      style: "signature1",
                    },
                    {
                      text: ["Sr.(a) ", { text: clients[i].credits[i2].guarantor }],
                      width: 163,
                      style: "signature1",
                    },
                  ],
                },
                {
                  columns: [
                    { text: "DEUDOR", width: 163, style: "signature2" },
                    { text: relationShip.type, width: 163, style: "signature2" },
                    { text: "GARANTE", width: 163, style: "signature2" },
                  ],
                },
                {
                  columns: [
                    {
                      text: ["No C.I: ", { text: clients[i].identification }],
                      width: 163,
                      style: "signature2",
                    },
                    {
                      text: ["No C.I: ", { text: relationShip.ci }],
                      width: 163,
                      style: "signature2",
                    },
                    {
                      text: ["No C.I: ", { text: "Poner CI del Garante" }],
                      width: 163,
                      style: "signature2",
                    },
                  ],
                },
                {
                  columns: [
                    { text: "", width: 163 },
                    { text: "____________________________", width: 163, marginTop: 70 },
                    { text: "", width: 163 },
                  ],
                },
                {
                  columns: [
                    { text: "", width: 163 },
                    {
                      text: ["Sr.(a) ", { text: controlInfo.legalRepresentative }],
                      width: 163,
                      style: "signature1",
                    },
                    { text: "", width: 163 },
                  ],
                },
                {
                  columns: [
                    { text: "", width: 163 },
                    { text: "GERENTE", width: 163, style: "signature2" },
                    { text: "", width: 163 },
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

  const handleGeneratedPDF = () => {
    setAux1(true);
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(amortizationTablePDF).download("Tabla-de-Amortización.pdf");
  };

  return (
    <Grid container>
      <MDButton
        variant="text"
        size="medium"
        onClick={handleGeneratedPDF}
        sx={{ background: "#7B809A", "&:hover": { background: "#99A3A4" } }}
      >
        PDF
      </MDButton>
    </Grid>
  );
}
