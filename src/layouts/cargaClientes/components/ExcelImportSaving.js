/* eslint-disable object-shorthand */
import React, { useReducer, useState } from "react";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import PropTypes from "prop-types";
import { ExcelRenderer, OutTable } from "react-excel-renderer";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import UploadIcon from "@mui/icons-material/Upload";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ActionReduce from "./ActionReduce";
import ExcelExport from "./ExcelExport";

export default function ExcelImportSaving({ worksheets }) {
  const [state, setState] = useState({ cols: [], rows: [] });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataBase, dispatch] = useReducer(ActionReduce);
  // const { uploadClients } = useContext(ClientsContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload = () => {
    // if (dataBase) uploadClients(dataBase);
    if (dataBase) console.log(dataBase);
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

          const savingHistoryTempo = {
            type: value[0],
            transactionDate: value[1],
            transactionValue: value[2],
            actualBalance: value[3],
            observation: value[4],
          };

          dispatch({
            type: "SAVING_HISTORY",
            payload: savingHistoryTempo,
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
          CARGAR HISTORIAL DE AHORROS DEL CLIENTE
        </MDTypography>

        <Grid container>
          <Grid item xs={4}>
            <ExcelExport filename="Historial-de-Ahorros.xlsx" worksheets={worksheets} />
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
              Finalmente, seleccione el botón <b>Subir archivo</b> y se cargarán todos los datos.
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

ExcelImportSaving.propTypes = {
  worksheets: PropTypes.string.isRequired,
};
