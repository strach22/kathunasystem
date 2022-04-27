import React from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ExcelImportSaving from "./ExcelImportSaving";

const useStyles = makeStyles({
  root: {
    "& .excel-import-container": {
      padding: "25px",
      boxShadow: "0 0 20px rgba(66, 50, 98, 0.35)",
      border: "1px solid #eaeaea",
      borderRadius: "10px",
    },
    "& .file-upload": {
      display: "grid",
      gridGap: "10px",
    },
    "& .MuiTypography-root": {
      color: "black",
    },
    "& #excel-upload": {
      width: "100%",
      height: "25px",
      border: "1px solid #cdcdcd",
      borderRadius: "4px",
      fontFamily: "arial, sans-serif",
      fontSize: "75%",
    },
    "& .excel-table": {
      width: "100%",
      fontSize: "75%",
    },
    "& .excel-table tr:first-of-type": {
      display: "none",
    },
    "& .excel-table tr": {
      backgroundColor: "#c6e6f5",
    },
    "& .excel-table td": {
      padding: "5px 10px",
    },
    "& .excel-table tr:nth-of-type(2)": {
      backgroundColor: "#3d5662 !important",
      color: "#fff",
    },
    "& .excel-table td:nth-of-type(1)": {
      display: "none",
    },
    "& .excel-table tr:nth-of-type(even)": {
      backgroundColor: "#e6fbff",
    },
    "& .excel-table-import": {
      margin: "15px 0px",
      maxHeight: "400px",
      overflowY: "scroll",
    },
    "& .AlertDialog": {
      margin: "25px 0px",
    },
  },
});

export default function SavingHistoryScreen() {
  const classes = useStyles();

  const worksheets = [
    {
      name: "Requisitos",
      columns: [
        { label: "Tipo de Transacción", value: "tipoTransaccion" },
        { label: "Fecha", value: "fecha" },
        { label: "Valor de la Transacción", value: "valorTransaccion" },
        { label: "Saldo Final", value: "saldoFinal" },
        { label: "Observación", value: "observacion" },
        { label: "Cédula de Identidad", value: "cedulaIdentidad" },
      ],
      data: [
        {
          tipoTransaccion: "Depósito",
          fecha: "01/03/2022",
          valorTransaccion: "2500",
          saldoFinal: "3600",
          observacion: "Añado algún comentario relevante",
          cedulaIdentidad: "1782456983",
        },
        {
          tipoTransaccion: "Retiro",
          fecha: "16/04/2022",
          valorTransaccion: "200",
          saldoFinal: "3400",
          observacion: "Número de Cédula es necesario colocar una sola vez",
        },
        {
          tipoTransaccion: "Retiro",
          fecha: "26/04/2022",
          valorTransaccion: "50",
          saldoFinal: "3350",
          observacion: "NULL",
        },
      ],
    },
  ];

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <ExcelImportSaving worksheets={worksheets} />
      </Grid>
    </Grid>
  );
}
