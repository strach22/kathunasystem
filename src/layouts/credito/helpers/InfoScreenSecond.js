import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ClientsContext from "context/Clients/ClientsContext";

export default function InfoScreenSecond() {
  const { clients } = useContext(ClientsContext);
  const { id } = useParams();
  const [idC] = id.split("-");
  const i = clients.map((e) => e.id).indexOf(idC);

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
    <MDBox mt={1} mb={3}>
      <Grid container spacing={3}>
        <Grid item xs={11}>
          <MDBox coloredShadow="secondary" pb={2}>
            <Link to={`/clientes/${idC}`}>
              <MDTypography padding={2} variant="h4" color="info" sx={{ textAlign: "center" }}>
                Cliente # {idC}
              </MDTypography>
            </Link>
            {getInfo("Nombres:", clients[i].firstName)}
            {getInfo("Apellidos:", clients[i].lastName)}
            {getInfo("Documento de Identidad:", clients[i].identification)}
            {getInfo("Teléfono:", clients[i].mobile)}
            {getInfo("Saldo de Creditos:", `$ ${clients[i].creditBalance.toFixed(2)}`)}
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
