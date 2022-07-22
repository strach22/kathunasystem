import React, { useState, useEffect, useContext } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import MDButton from "components/MDButton";
import ClientsContext from "context/Clients/ClientsContext";
import zfill from "elements/helpers/zfill";

// eslint-disable-next-line react/prop-types
export default function DownloadAmortization({ i, i2 }) {
  const [relationShip, setRelationShip] = useState({ name: "", type: "", ci: "" });
  const [aux1, setAux1] = useState(false);
  const { clients, controlInfo } = useContext(ClientsContext);
  let realName = "";
  let realDate = "";

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
        ci: clients[i].identificationRelationShip,
      });
    }
  }, [aux1]);

  if (clients[i].credits[i2].state === "Creado") {
    realName = "Fecha de Creación:";
    realDate = clients[i].credits[i2].creationDate;
  } else if (clients[i].credits[i2].state === "Aprobado") {
    realName = "Fecha de Aprobación:";
    realDate = clients[i].credits[i2].approvalDate;
  } else {
    realName = "Fecha de Inicio:";
    realDate = clients[i].credits[i2].initialDate;
  }

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

  function footerDefinition(currentPage, pageCount) {
    return [
      {
        margin: [40, 10, 40],
        layout: {
          hLineColor: (val) => (val === 0 ? "lightgray" : ""),
          vLineWidth: () => 0,
          hLineWidth: (val) => (val === 0 ? 1 : 0),
        },
        table: {
          widths: ["*", 160],
          body: [[{ text: "" }, { text: `${currentPage}/${pageCount}`, alignment: "right" }]],
        },
      },
    ];
  }

  const amortizationTablePDF = {
    pageMargins: [40, 40, 40, 60],
    footer: footerDefinition,
    background(currentPage) {
      return currentPage === 1
        ? [
            {
              canvas: [
                { type: "rect", x: 20, y: 15, w: 555, h: 280, r: 10, lineColor: "#000" },
                { type: "line", x1: 60, y1: 105, x2: 535, y2: 105, lineWidth: 2.5 },
                { type: "line", x1: 60, y1: 215, x2: 535, y2: 215, lineWidth: 2.5 },
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
            { text: `''${controlInfo.nameSlogan}''`, style: "title" },
            { text: controlInfo.nameLocation, style: "title", fontSize: 10 },
          ],
        ],
      },
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
                    { text: realName, style: "Col1", width: 80 },
                    { text: realDate, style: "Col2", width: 80 },
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
                    { text: `$ ${clients[i].credits[i2].loanValue}`, style: "Col2" },
                    { text: "Valor  Cuota:", style: "Col1", width: 80 },
                    {
                      text: `$ ${clients[i].credits[i2].monthlyPayment}`,
                      style: "Col2",
                      width: 80,
                    },
                  ],
                },
                {
                  columns: [
                    { text: "Número de Cuotas:", style: "Col1", width: 95 },
                    { text: clients[i].credits[i2].periods, style: "Col2" },
                    { text: "Total Interés:", style: "Col1", width: 80 },
                    { text: `${clients[i].credits[i2].interest} %`, style: "Col2", width: 80 },
                  ],
                },
              ],
            },
          ],
        ],
      },
      "\n\n",
      {
        columns: [
          [
            { text: "TIPO", style: "title" },
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
      "\n\n",
      "\n\n",
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
        layout: "noBorders",
        table: {
          dontBreakRows: true,
          body: [
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
                        text: [
                          "Sr.(a) ",
                          { text: `${clients[i].firstName} ${clients[i].lastName}` },
                        ],
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
                        text: [
                          "No C.I: ",
                          { text: clients[i].credits[i2].identificationGuarantor },
                        ],
                        width: 163,
                        style: "signature2",
                      },
                    ],
                  },
                ],
              },
            ],
          ],
        },
      },
      {
        layout: "noBorders",
        table: {
          dontBreakRows: true,
          body: [
            [
              {
                stack: [
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
      },
    ],
    styles: {
      title: {
        color: "#333333",
        width: "*",
        bold: true,
        alignment: "center",
        marginBottom: 3,
        fontSize: 12,
      },
      subtitle: {
        color: "red",
        width: "*",
        bold: true,
        marginBottom: 3,
        alignment: "center",
        fontSize: 11,
      },
      subtitle2: {
        color: "red",
        bold: true,
        italics: true,
        fontSize: 10,
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
    <MDButton size="medium" color="text" onClick={handleGeneratedPDF}>
      TABLA DE AMORTIZACIÓN
    </MDButton>
  );
}
