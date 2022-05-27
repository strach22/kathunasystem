import React, { useContext } from "react";
import { Grid } from "@mui/material";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { makeStyles } from "@mui/styles";
import { Workbook } from "react-excel-workbook";
import MDButton from "components/MDButton";
import ClientsContext from "context/Clients/ClientsContext";

const useStyles = makeStyles({
  root: {
    // Button
    "& .MuiButton-root": {
      marginBottom: "20px",
      marginRight: "1px",
    },
  },
});

// eslint-disable-next-line react/prop-types
export default function SimulatorHistory({ rows }) {
  const classes = useStyles();
  const { controlInfo } = useContext(ClientsContext);

  function buildTableBody(data, columns) {
    const body = [];

    const auxColumns = [
      { text: "Código", alignment: "center", bold: true, color: "white", fontSize: 15 },
      { text: "Interés Periodo", alignment: "center", bold: true, color: "white", fontSize: 15 },
      { text: "Capital Amortizado", alignment: "center", bold: true, color: "white", fontSize: 15 },
      { text: "Desgravamen", alignment: "center", bold: true, color: "white", fontSize: 15 },
      { text: "Valor Cuota", alignment: "center", bold: true, color: "white", fontSize: 15 },
      { text: "Saldo", alignment: "center", bold: true, color: "white", fontSize: 15 },
    ];

    body.push(auxColumns);

    data.forEach((row) => {
      const dataRow = [];

      columns.forEach((column) => {
        dataRow.push({
          text: row[column].toString(),
          alignment: "left",
          color: "black",
          marginLeft: 25,
        });
      });

      body.push(dataRow);
    });

    return body;
  }

  const simulatorPDF = {
    pageMargins: [40, 40, 40, 80],
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
              text: "TIPO DE TRANSACCIÓN",
              color: "#333333",
              width: "*",
              fontSize: 15,
              bold: true,
              alignment: "center",
            },
            {
              text: "SIMULADOR",
              color: "red",
              width: "*",
              fontSize: 13,
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
          fillColor(rowIndex) {
            if (rowIndex === 0) return "#088FCA";
            return rowIndex % 2 === 0 ? "#85B1C4" : "#D3D3D3";
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
          widths: ["auto", "auto", "auto", "auto", "auto", "auto"],
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
    ],
    styles: {
      border: {
        fontSize: 15,
        bold: true,
        alignment: "center",
        color: "black",
        marginTop: 20,
        marginBottom: 40,
      },
    },
    defaultStyle: {
      columnGap: 20,
    },
  };

  const worksheets = [
    {
      name: "Historial de Gastos",
      columns: [
        { label: "Cuotas", value: "cuota" },
        { label: "Interés Periodo", value: "interesPeriodo" },
        { label: "Capital Amortizado", value: "capitalAmortizado" },
        { label: "Desgravamen", value: "desgravamen" },
        { label: "Valor Cuota", value: "valorCuota" },
        { label: "Saldo", value: "saldo" },
      ],
      data: rows,
    },
  ];

  const handleGeneratedPDF = () => {
    if (!rows[0] === false) {
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      pdfMake.createPdf(simulatorPDF).open();
    }
  };

  return (
    <Grid container className={classes.root}>
      <Workbook
        filename="Tabla-de-Amortización.xlsx"
        element={
          <MDButton
            variant="text"
            size="medium"
            sx={{ background: "#7B809A", "&:hover": { background: "#99A3A4" } }}
          >
            Excel
          </MDButton>
        }
      >
        {worksheets.map(({ name, columns, data }) => (
          <Workbook.Sheet name={name} data={data}>
            {columns.map(({ label, value }) => (
              <Workbook.Column label={label} value={value} />
            ))}
          </Workbook.Sheet>
        ))}
      </Workbook>
      <MDButton
        variant="text"
        size="medium"
        onClick={handleGeneratedPDF}
        sx={{ background: "#7B809A", "&:hover": { background: "#99A3A4" } }}
      >
        PDF
      </MDButton>
      <MDButton
        variant="text"
        size="medium"
        // onClick={handlePrintPDF}
        sx={{ background: "#7B809A", "&:hover": { background: "#99A3A4" } }}
      >
        Descargar
      </MDButton>
    </Grid>
  );
}
