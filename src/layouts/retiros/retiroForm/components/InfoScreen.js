import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React from "react";
import { useParams } from "react-router-dom";

import clients from "../../../../data/clients.json";

export default function InfoScreen() {
  const { id } = useParams();

  return (
    <MDBox mt={6} mb={3}>
      <Grid container spacing={3}>
        <Grid item xs={10}>
          <MDBox coloredShadow="secondary">
            <MDTypography padding={2} variant="h4">
              Cliente # {id}
            </MDTypography>
            <MDTypography variant="h5" paddingLeft={2} paddingBottom={2}>
              Nombres: {clients[id - 1].firstName}
              <br />
              Apellidos: {clients[id - 1].lastName}
              <br />
              Documento de Identidad: {clients[id - 1].identification}
              <br />
              Teléfono: {clients[id - 1].mobile}
              <br />
              Saldo de Ahorros: {clients[id - 1].saldoAhorros}
            </MDTypography>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
