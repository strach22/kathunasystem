import { useContext } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import MDBox from "components/MDBox";
import { Card, Grid } from "@mui/material";
import MDTypography from "components/MDTypography";

import ClientsContext from "context/Clients/ClientsContext";
import DownloadAmortization from "layouts/credito/download/DownloadAmortization";
import DownloadBillofExchange from "layouts/credito/download/DownloadBillofExchange";
import InfoScreenSecond from "layouts/credito/helpers/InfoScreenSecond";
import MonthlyPaymentHistory from "./MonthlyPaymentHistory";

const useStyles = makeStyles({
  root: {
    "& .css-1f19gdh": {
      margin: "30px",
      padding: "24px",
    },
  },
});

export default function PrincipalScreen() {
  const classes = useStyles();
  const { clients } = useContext(ClientsContext);
  const { id } = useParams();
  const [idC, idF] = id.split("-");
  const i = clients.map((e) => e.id).indexOf(idC);
  const [folderInfo] = clients[i].credits.filter((folder) => folder.id === idF);

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
    <MDBox pt={6} pb={3} mx={15}>
      <Grid container spacing={6} className={classes.root}>
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
                Información Carpeta
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
              <MDBox mt={6} mb={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <DownloadAmortization />
                    <DownloadBillofExchange />
                  </Grid>
                  <Grid item xs={11}>
                    <MDBox coloredShadow="secondary" pb={2}>
                      <MDTypography padding={2} variant="h4" sx={{ textAlign: "center" }}>
                        Carpeta # {idF}
                      </MDTypography>
                      {getInfo("Fecha de inicio:", folderInfo.initialDate)}
                      {getInfo("Deuda Total:", folderInfo.loanValue)}
                      {getInfo("Pagos Mensuales:", folderInfo.monthlyPayment)}
                      {getInfo("Intereses:", folderInfo.interest)}
                      {getInfo("Cuotas:", folderInfo.periods)}
                      {getInfo("Deuda Actual:", folderInfo.actualLoan)}
                      {getInfo("Estado:", folderInfo.state)}
                      {getInfo("Garante:", folderInfo.guarantor)}
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
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
                Historial de las Cuotas
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
              <MonthlyPaymentHistory />
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}
