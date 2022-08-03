import React, { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MonthlyPaymentHistory from "layouts/credito/verCarpeta/components/MonthlyPaymentHistory";
import InfoScreenSecond from "layouts/credito/helpers/InfoScreenSecond";
import ClientsContext from "context/Clients/ClientsContext";
import MonthlyPayment from "./MonthlyPayment";

export default function PrincipalScreen() {
  const { clients } = useContext(ClientsContext);
  const id = useMemo(() => useParams().id, []);

  const [idC, idF] = id.split("-");

  const i = clients.map((e) => e.id).indexOf(idC);
  const i2 = clients[i].credits.map((e) => e.id).indexOf(idF);

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
              <InfoScreenSecond />
            </MDBox>
          </Card>
        </Grid>
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
                Pago Mensual de Cuota
              </MDTypography>
            </MDBox>
            <MDBox pt={1} mx={5} mb={3}>
              <MonthlyPayment i={i} i2={i2} />
            </MDBox>
          </Card>
        </Grid>
        {clients[i].credits[i2].state !== "Creado" &&
          clients[i].credits[i2].state !== "Aprobado" &&
          clients[i].credits[i2].state !== "Denegado" && (
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
                    Historial de las Cuotas
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <MonthlyPaymentHistory />
                </MDBox>
              </Card>
            </Grid>
          )}
      </Grid>
    </MDBox>
  );
}
