import { useContext } from "react";
import ClientsContext from "context/Clients/ClientsContext";
import { useParams, Link } from "react-router-dom";
import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

export default function InfoScreen() {
  const { id } = useParams();
  const { clients } = useContext(ClientsContext);
  const i = clients.map((e) => e.id).indexOf(id);

  const getInfo = (category, info) => (
    <Grid container paddingLeft={3}>
      <Grid item xs={12} md={6.2}>
        <MDTypography variant="h5">{category}</MDTypography>
      </Grid>
      <Grid item xs={12} md={5}>
        <MDTypography fontWeight="regular" variant="h5">
          {info}
        </MDTypography>
      </Grid>
    </Grid>
  );

  return (
    <MDBox mt={1} mb={6} mx={5}>
      <Grid container>
        <Grid item xs={12}>
          <MDBox coloredShadow="secondary" pb={2}>
            <Link to={`/clientes/${id}`}>
              <MDTypography padding={2} color="info" variant="h4" sx={{ textAlign: "center" }}>
                Cliente # {id}
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
