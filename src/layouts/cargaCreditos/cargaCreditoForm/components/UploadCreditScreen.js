import { Grid } from "@mui/material";
import React from "react";
import TableCreditScreen from "./TableCreditScreen";

export default function UploadCreditScreen() {
  const worksheets = [
    {
      name: "Requisitos",
      columns: [
        { label: "Número de Cuota", value: "quotaNumber" },
        { label: "Número de Comprobante", value: "receipt" },
        { label: "Fecha de Pago", value: "paymentDate" },
        { label: "Valor Cuota", value: "quotaValue" },
        { label: "Tipo de Pago", value: "paymentType" },
        { label: "Observacion", value: "observation" },
      ],
      data: [
        {
          quotaNumber: "1",
          receipt: "1",
          paymentDate: "2021/08/16",
          quotaValue: "98.32",
          paymentType: "EFECTIVO",
          observation: "Cualquier Observación",
        },
        {
          quotaNumber: "2",
          receipt: "9",
          paymentDate: "2021/09/16",
          quotaValue: "98.32",
          paymentType: "EFECTIVO",
          observation: "Cualquier Observación",
        },
        {
          quotaNumber: "3",
          receipt: "23",
          paymentDate: "2021/10/16",
          quotaValue: "98.32",
          paymentType: "EFECTIVO",
          observation: "Cualquier Observación",
        },
        {
          quotaNumber: "4",
          receipt: "28",
          paymentDate: "2021/11/16",
          quotaValue: "98.32",
          paymentType: "EFECTIVO",
          observation: "Cualquier Observación",
        },
        {
          quotaNumber: "5",
          receipt: "35",
          paymentDate: "2021/12/16",
          quotaValue: "98.32",
          paymentType: "CHEQUE",
          observation: "Cualquier Observación",
        },
        {
          quotaNumber: "6",
          receipt: "49",
          paymentDate: "2022/01/16",
          quotaValue: "98.32",
          paymentType: "CHEQUE",
          observation: "Cualquier Observación",
        },
        {
          quotaNumber: "7",
          receipt: "52",
          paymentDate: "2022/02/16",
          quotaValue: "98.32",
          paymentType: "CHEQUE",
          observation: "Cualquier Observación",
        },
        {
          quotaNumber: "8",
          receipt: "58",
          paymentDate: "2022/03/16",
          quotaValue: "98.32",
          paymentType: "CHEQUE",
          observation: "Cualquier Observación",
        },
        {
          quotaNumber: "9",
          receipt: "64",
          paymentDate: "2022/04/16",
          quotaValue: "98.32",
          paymentType: "TRANSFERENCIA",
          observation: "Cualquier Observación",
        },
        {
          quotaNumber: "10",
          receipt: "70",
          paymentDate: "2022/05/16",
          quotaValue: "98.32",
          paymentType: "TRANSFERENCIA",
          observation: "Cualquier Observación",
        },
        {
          quotaNumber: "11",
          receipt: "79",
          paymentDate: "2022/06/16",
          quotaValue: "98.32",
          paymentType: "NULL",
          observation: "Cualquier Observación",
        },
        {
          quotaNumber: "12",
          receipt: "86",
          paymentDate: "2022/07/16",
          quotaValue: "98.32",
          paymentType: "NULL",
          observation: "Cualquier Observación",
        },
      ],
    },
  ];

  return (
    <Grid container>
      <Grid item xs={12}>
        <TableCreditScreen worksheets={worksheets} />
      </Grid>
    </Grid>
  );
}
