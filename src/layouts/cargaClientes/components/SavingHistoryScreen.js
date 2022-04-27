import React from "react";
import { Grid } from "@mui/material";
import TableHistoryScreen from "./TableHistoryScreen";

export default function SavingHistoryScreen() {
  const worksheets = [
    {
      name: "Requisitos",
      columns: [
        { label: "Cédula de Identidad", value: "cedulaIdentidad" },
        { label: "Tipo de Transacción", value: "tipoTransaccion" },
        { label: "Fecha", value: "fecha" },
        { label: "Valor de la Transacción", value: "valorTransaccion" },
        { label: "Saldo Final", value: "saldoFinal" },
        { label: "Observación", value: "observacion" },
      ],
      data: [
        {
          cedulaIdentidad: "1782456983",
          tipoTransaccion: "Depósito",
          fecha: "01/03/2022",
          valorTransaccion: "2500",
          saldoFinal: "3600",
          observacion: "Añado algún comentario relevante",
        },
        {
          cedulaIdentidad: "1782456983",
          tipoTransaccion: "Retiro",
          fecha: "16/04/2022",
          valorTransaccion: "200",
          saldoFinal: "3400",
          observacion:
            "Se debe colocar el mismo número de cédula en todas las celdas pertinentes al historial de ahorros del cliente",
        },
        {
          cedulaIdentidad: "1782456983",
          tipoTransaccion: "Retiro",
          fecha: "26/04/2022",
          valorTransaccion: "50",
          saldoFinal: "3350",
          observacion: "NULL",
        },
        {
          cedulaIdentidad: "1102459983",
          tipoTransaccion: "Depósito",
          fecha: "03/03/2022",
          valorTransaccion: "500",
          saldoFinal: "500",
          observacion: "Añado algún comentario relevante del nuevo cliente",
        },
        {
          cedulaIdentidad: "1632547800",
          tipoTransaccion: "Depósito",
          fecha: "04/01/2022",
          valorTransaccion: "1508",
          saldoFinal: "1508",
          observacion: "Añado algún comentario relevante del nuevo cliente",
        },
        {
          cedulaIdentidad: "1632547800",
          tipoTransaccion: "Retiro",
          fecha: "04/02/2022",
          valorTransaccion: "508",
          saldoFinal: "1000",
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
