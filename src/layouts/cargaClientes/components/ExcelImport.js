/* eslint-disable object-shorthand */
import React, { useContext, useReducer, useState } from "react";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import { ExcelRenderer, OutTable } from "react-excel-renderer";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import MDButton from "components/MDButton";
import UploadIcon from "@mui/icons-material/Upload";
import ClientsContext from "context/Clients/ClientsContext";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ExcelExport from "./ExcelExport";
import ActionReduce from "./ActionReduce";

export default function ExcelImport({ worksheets }) {
  const [state, setState] = useState({ cols: [], rows: [] });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataBase, dispatch] = useReducer(ActionReduce);
  const { uploadClients } = useContext(ClientsContext);

  const handleClickOpen = () => {
    setLoading(!loading);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload = () => {
    if (dataBase) uploadClients(dataBase);
  };

  const uploadFile = (e) => {
    setLoading(true);
    const fileObj = e.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      if (!err) {
        const { cols, rows } = resp;
        setState({
          cols: cols,
          rows: rows,
        });
        const data = [...rows];
        data.shift();

        for (let i = 0; i < data.length; i += 1) {
          const value = data[i].map((val) => val);

          const dataBaseTempo = {
            id: value[0],
            firstName: value[1],
            lastName: value[2],
            identification: value[3],
            mobile: value[4],
            secondMobile: value[5],
            tariff: value[6],
            civil: value[7],
            birthDate: value[8],
            creationDate: value[9],
            address: value[10],
            email: value[11],
            firstNameSpouse: value[12],
            lastNameSpouse: value[13],
            identificationSpouse: value[14],
            mobileSpouse: value[15],
            relationShip: value[16],
            firstNameRelationShip: value[17],
            lastNameRelationShip: value[18],
            mobileRelationShip: value[19],
            savingBalance: value[20],
            creditBalance: value[21],
            savingHistory: [
              {
                type: "",
                transactionDate: "",
                transactionValue: "",
                actualBalance: "",
              },
            ],
          };

          const valDate = parseInt(dataBaseTempo.birthDate.substring(0, 2), 10);
          const valMonth = parseInt(dataBaseTempo.birthDate.substring(3, 5), 10);
          const valYear = parseInt(dataBaseTempo.birthDate.substring(6, 10), 10);

          dataBaseTempo.birthDate = new Date();

          dataBaseTempo.birthDate.setDate(valDate);
          dataBaseTempo.birthDate.setMonth(valMonth);
          dataBaseTempo.birthDate.setFullYear(valYear);

          // Si se quiere obtener en string:
          // values.birthDate.toISOString().split("T")[0];

          dispatch({
            type: "CLIENT_DATA",
            payload: dataBaseTempo,
          });
        }
      }
      setLoading(false);
    });
  };

  return (
    <div className="excel-import-container">
      <div className="file-upload">
        <MDTypography variant="h5" sx={{ marginBottom: 2 }}>
          CARGAR DATOS DE LOS CLIENTES
        </MDTypography>

        <Grid container>
          <Grid item xs={4}>
            <ExcelExport filename="Lista-de-clientes.xlsx" worksheets={worksheets} />
          </Grid>
          <Grid item xs={4}>
            <MDButton onClick={handleUpload} color="info" sx={{ width: "75%" }}>
              <UploadIcon color="dark" fontSize="large" sx={{ marginRight: 1 }} />
              SUBIR ARCHIVO
            </MDButton>
          </Grid>
        </Grid>
        <input id="excel-upload" type="file" onChange={uploadFile} />
      </div>

      <div className="AlertDialog">
        <MDButton variant="outlined" color="info" onClick={handleClickOpen}>
          <InfoOutlinedIcon sx={{ marginRight: 1 }} />
          INFORMACIÓN IMPORTANTE
        </MDButton>
        <Dialog onClose={handleClose} open={open} sx={{ background: "#B2C6C6" }}>
          <DialogTitle onClose={handleClose}>INSTRUCCIONES</DialogTitle>
          <DialogContent dividers>
            <MDTypography gutterBottom>
              Descargar la plantilla y colocar la información en el archivo EXCEL con la misma
              estructura.
            </MDTypography>
            <MDTypography gutterBottom>
              Revisar todos los datos con mucho cuidado. NO SE PODRÁ REVERTIR LOS CAMBIOS.
            </MDTypography>
            <MDTypography gutterBottom>
              Una vez seleccionado el archivo, espere unos segundos y podrá observar la tabla en
              pantalla y verificar que todos los datos sean correctos
            </MDTypography>
            <MDTypography gutterBottom>
              Finalmente, seleccione el botón <b>Subir archivo</b> y se cargarán todos los clientes.
            </MDTypography>
          </DialogContent>
          <DialogActions>
            <MDButton autoFocus onClick={handleClose} color="info">
              OK
            </MDButton>
          </DialogActions>
        </Dialog>
      </div>

      <Grid container>
        {loading && <CircularProgress disableShrink color="inherit" sx={{ marginRight: "2%" }} />}
        {loading && <MDTypography>Cargando ...</MDTypography>}
      </Grid>

      <div className="excel-table-import">
        <OutTable data={state.rows} columns={state.cols} tableClassName="excel-table" />
      </div>
    </div>
  );
}

ExcelImport.propTypes = {
  worksheets: PropTypes.string.isRequired,
};
