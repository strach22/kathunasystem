import React from "react";
import { Grid } from "@mui/material";
import TableHistoryScreen from "./TableHistoryScreen";

export default function SavingHistoryScreen() {
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
    <Grid container>
      <Grid item xs={12}>
        <TableHistoryScreen worksheets={worksheets} />
      </Grid>
    </Grid>
  );
}
