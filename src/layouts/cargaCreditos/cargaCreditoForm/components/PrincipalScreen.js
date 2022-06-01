import React, { useContext, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
import { Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ClientsContext from "context/Clients/ClientsContext";
import UploadCreditScreen from "./UploadCreditScreen";

const useStyles = makeStyles({
  root: {
    "& .excel-import-container": {
      padding: "25px",
      margin: "40px 60px 60px 60px",
      boxShadow: "0 0 20px rgba(66, 50, 98, 0.35)",
      border: "1px solid #eaeaea",
      borderRadius: "10px",
    },
    "& .file-upload": {
      display: "grid",
      gridGap: "10px",
    },
    "& .MuiTypography-root": {
      color: "black",
    },
    "& #excel-upload": {
      width: "100%",
      height: "25px",
      border: "1px solid #cdcdcd",
      borderRadius: "4px",
      fontFamily: "arial, sans-serif",
      fontSize: "75%",
    },
    "& .excel-table": {
      width: "100%",
      fontSize: "75%",
    },
    "& .excel-table tr:first-of-type": {
      display: "none",
    },
    "& .excel-table tr": {
      backgroundColor: "#c6e6f5",
    },
    "& .excel-table td": {
      padding: "5px 10px",
    },
    "& .excel-table tr:nth-of-type(2)": {
      backgroundColor: "#3d5662 !important",
      color: "#fff",
    },
    "& .excel-table td:nth-of-type(1)": {
      display: "none",
    },
    "& .excel-table tr:nth-of-type(even)": {
      backgroundColor: "#e6fbff",
    },
    "& .excel-table-import": {
      margin: "15px 0px",
      maxHeight: "400px",
      overflowY: "scroll",
    },
    "& .AlertDialog": {
      margin: "10px 0px 0px 60px",
    },
    // Label
    "& .Subtitles": {
      marginBottom: "15px",
      color: "#585858",
    },
    // Label
    "& .Subtitles2": {
      margin: "30px 0px 15px 0px",
      color: "#585858",
    },
    // NumericInput
    "& .MuiInputBase-adornedStart": {
      width: "100%",
      fontSize: "80%",
    },
    // NumericInput
    "& .interestValueClass": {
      width: "100%",
      fontSize: "80%",
    },
    // Calendario
    "& .MuiTextField-root": {
      width: "100%",
    },
    // Selector
    "& .MuiFormControl-fullWidth": {
      width: "100%",
    },
    // Label Selector
    "& .css-56s1s1-MuiInputBase-root-MuiOutlinedInput-root": {
      fontSize: "80%",
      color: "black",
    },
    // Selector
    "& #demo-simple-select": {
      width: "100%",
      height: 46,
      marginLeft: "10px",
    },
  },
});

export default function PrincipalScreen() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <MDBox pt={6} pb={3} mx={15}>
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
            <MDBox pt={3} sx={{ margin: "30px", padding: "24px" }}>
              <Grid container spacing={3}>
                <Grid item xs={11}>
                  <MDBox coloredShadow="secondary" pb={2}>
                    <MDTypography padding={2} variant="h4" sx={{ textAlign: "center" }}>
                      Cliente # {idC}
                    </MDTypography>
                    {getInfo("Nombres:", clients[i].firstName)}
                    {getInfo("Apellidos:", clients[i].lastName)}
                    {getInfo("Documento de Identidad:", clients[i].identification)}
                    {getInfo("Teléfono:", clients[i].mobile)}
                  </MDBox>
                </Grid>
              </Grid>
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
                Carga de Créditos
              </MDTypography>
            </MDBox>
            <MDBox pt={3} className={classes.root}>
              <div className="AlertDialog">
                <MDButton variant="outlined" color="info" onClick={handleClickOpen}>
                  <InfoOutlinedIcon sx={{ marginRight: 1 }} />
                  INFORMACIÓN IMPORTANTE
                </MDButton>
                <Dialog onClose={handleClose} open={open} sx={{ background: "#B2C6C6" }}>
                  <DialogTitle onClose={handleClose}>INSTRUCCIONES</DialogTitle>
                  <DialogContent dividers>
                    <MDTypography gutterBottom>
                      Descargar la plantilla y colocar la información en el archivo EXCEL con la
                      misma estructura.
                    </MDTypography>
                    <MDTypography gutterBottom>
                      Revisar todos los datos con mucho cuidado. NO SE PODRÁ REVERTIR LOS CAMBIOS.
                    </MDTypography>
                    <MDTypography gutterBottom>
                      Es obligatorio colocar el número de carpeta, la fecha de entrega del crédito,
                      garante y el valor del préstamo.
                    </MDTypography>
                    <MDTypography gutterBottom>
                      Finalmente, seleccione el botón <b>Subir archivo</b> y se cargarán todos los
                      datos de los clientes.
                    </MDTypography>
                  </DialogContent>
                  <DialogActions>
                    <MDButton autoFocus onClick={handleClose} color="info">
                      OK
                    </MDButton>
                  </DialogActions>
                </Dialog>
              </div>

              <UploadCreditScreen />
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}
