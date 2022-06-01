import { Grid } from "@mui/material";
import React from "react";
import TableCreditScreen from "./TableCreditScreen";

export default function UploadCreditScreen() {
  const worksheets = [
    {
      name: "Requisitos",
      columns: [
        { label: "Número de Cuota", value: "quotaNumber" },
        { label: "Fecha de Pago", value: "paymentDate" },
        { label: "Valor Cuota", value: "quotaValue" },
        { label: "Tipo de Pago", value: "paymentType" },
        { label: "Observacion", value: "observation" },
      ],
      data: [
        {
          quotaNumber: "1",
          paymentDate: "2021/08/16",
          quotaValue: "98.32",
          paymentType: "EFECTIVO",
          observation: "Cualquier Observación",
        },
        {
          quotaNumber: "2",
          paymentDate: "2021/09/16",
          quotaValue: "98.32",
          paymentType: "EFECTIVO",
          observation: "Cualquier Observación",
        },
        {
          folder: "001",
          quotaNumber: "3",
          paymentDate: "2021/10/16",
          quotaValue: "98.32",
          paymentType: "EFECTIVO",
          observation: "Cualquier Observación",
        },
        {
          folder: "001",
          quotaNumber: "4",
          paymentDate: "2021/11/16",
          quotaValue: "98.32",
          paymentType: "EFECTIVO",
          observation: "Cualquier Observación",
        },
        {
          folder: "001",
          quotaNumber: "5",
          paymentDate: "2021/12/16",
          quotaValue: "98.32",
          paymentType: "CHEQUE",
          observation: "Cualquier Observación",
        },
        {
          folder: "001",
          quotaNumber: "6",
          paymentDate: "2022/01/16",
          quotaValue: "98.32",
          paymentType: "CHEQUE",
          observation: "Cualquier Observación",
        },
        {
          folder: "001",
          quotaNumber: "7",
          paymentDate: "2022/02/16",
          quotaValue: "98.32",
          paymentType: "CHEQUE",
          observation: "Cualquier Observación",
        },
        {
          folder: "001",
          quotaNumber: "8",
          paymentDate: "2022/03/16",
          quotaValue: "98.32",
          paymentType: "CHEQUE",
          observation: "Cualquier Observación",
        },
        {
          folder: "001",
          quotaNumber: "9",
          paymentDate: "2022/04/16",
          quotaValue: "98.32",
          paymentType: "TRANSFERENCIA",
          observation: "Cualquier Observación",
        },
        {
          folder: "001",
          quotaNumber: "10",
          paymentDate: "2022/05/16",
          quotaValue: "98.32",
          paymentType: "TRANSFERENCIA",
          observation: "Cualquier Observación",
        },
        {
          folder: "001",
          quotaNumber: "11",
          paymentDate: "2022/06/16",
          quotaValue: "98.32",
          paymentType: "NULL",
          observation: "Cualquier Observación",
        },
        {
          folder: "001",
          quotaNumber: "12",
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
