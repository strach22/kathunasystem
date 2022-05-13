import React, { useContext } from "react";
import ClientsContext from "context/Clients/ClientsContext";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

export default function InfoScreen() {
  const { id } = useParams();
  const { clients } = useContext(ClientsContext);
  const i = clients.map((e) => e.id).indexOf(id);

  const getInfo = (category, info) => (
    <Grid container paddingLeft={3}>
      <Grid item xs={6.8}>
        <MDTypography variant="h5">{category}</MDTypography>
      </Grid>
      <Grid item xs={5}>
        <MDTypography fontWeight="regular" variant="h5">
          {info}
        </MDTypography>
      </Grid>
    </Grid>
  );

  return (
    <MDBox mt={6} mb={3}>
      <Grid container spacing={3}>
        <Grid item xs={11}>
          <MDBox coloredShadow="secondary" pb={2}>
            <MDTypography padding={2} variant="h4" sx={{ textAlign: "center" }}>
              Cliente # {id}
            </MDTypography>
            {getInfo("Nombres:", clients[i].firstName)}
            {getInfo("Apellidos:", clients[i].lastName)}
            {getInfo("Documento de Identidad:", clients[i].identification)}
            {getInfo("Teléfono:", clients[i].mobile)}
            {getInfo("Saldo de Creditos:", clients[i].creditBalance)}
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
