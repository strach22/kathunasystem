import React, { useContext, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Grid } from "@mui/material";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import InfoScreen from "layouts/credito/helpers/InfoScreen";
import ClientsContext from "context/Clients/ClientsContext";
import CreditGenerated from "./CreditGenerated";

export default function PrincipalScreen() {
  const id = useMemo(() => useParams().id, []);
  const { clients } = useContext(ClientsContext);
  const i = clients.map((e) => e.id).indexOf(id);

  return (
    <MDBox pt={6} pb={3} mx={4}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h5" color="white">
                Datos del cliente
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
              <InfoScreen />
            </MDBox>
            <Grid item xs={12} sm={7} md={4} lg={3} mx={5} mb={3}>
              <Link to="/creditos">
                <MDButton
                  size="large"
                  variant="contained"
                  color="secondary"
                  sx={{
                    "&:hover": { background: "#99A3A4" },
                    width: "100%",
                  }}
                >
                  REGRESAR
                </MDButton>
              </Link>
            </Grid>
          </Card>
        </Grid>
        {clients[i].creditBalance > 0 && (
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h5" color="white">
                  Créditos Generados
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <CreditGenerated />
              </MDBox>
            </Card>
          </Grid>
        )}
      </Grid>
    </MDBox>
  );
}
