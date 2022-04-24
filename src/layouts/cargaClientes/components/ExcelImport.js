/* eslint-disable object-shorthand */
import React, { useContext, useReducer, useState } from "react";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import { ExcelRenderer, OutTable } from "react-excel-renderer";
import { Grid } from "@mui/material";
import MDButton from "components/MDButton";
import UploadIcon from "@mui/icons-material/Upload";
import ClientsContext from "context/Clients/ClientsContext";
import ExcelExport from "./ExcelExport";
import ActionReduce from "./ActionReduce";

export default function ExcelImport({ worksheets }) {
  const [state, setState] = useState({ cols: [], rows: [] });
  const [dataBase, dispatch] = useReducer(ActionReduce);
  const { uploadClients } = useContext(ClientsContext);

  const handleUpload = () => {
    if (dataBase) uploadClients(dataBase);
  };

  const uploadFile = (e) => {
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
            address: value[5],
            email: value[6],
            tariff: value[7],
            civil: value[8],
            birthDate: value[9],
            saldoAhorros: value[10],
            saldoCredito: value[11],
            creationDate: value[12],
            // numeroTelefono2: value[5],
            // email: value[6],
            // tarifa: value[7],
            // estadoCivil: value[8],
            // fechaNacimiento: value[9],
            // fechaCreacion: value[10],
            // direccion: value[11],
            // saldoAhorros: value[12],
            // saldoCredito: value[13],
            // nombresConyugue: value[14],
            // apellidosConyugue: value[15],
            // cedulaIdentidadConyugue: value[16],
            // telefonoConyugue: value[17],
            // parentesco: value[18],
            // nombresParentesco: value[19],
            // apellidosParentesco: value[20],
            // cedulaIdentidadParentesco: value[21],
          };

          dispatch({
            type: "CLIENT_DATA",
            payload: dataBaseTempo,
          });
        }
      }
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
      <div className="excel-table-import">
        <OutTable data={state.rows} columns={state.cols} tableClassName="excel-table" />
      </div>
    </div>
  );
}

ExcelImport.propTypes = {
  worksheets: PropTypes.string.isRequired,
};
