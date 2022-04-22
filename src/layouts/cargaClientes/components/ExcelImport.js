/* eslint-disable object-shorthand */
import React, { useState } from "react";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import { ExcelRenderer, OutTable } from "react-excel-renderer";
import { Grid } from "@mui/material";
import MDButton from "components/MDButton";
import UploadIcon from "@mui/icons-material/Upload";
import ExcelExport from "./ExcelExport";

export default function ExcelImport({ setData, worksheets, onClick }) {
  const [state, setState] = useState({ cols: [], rows: [] });

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
        setData(data);
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
            <MDButton onClick={onClick} color="info">
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
  setData: PropTypes.string.isRequired,
  worksheets: PropTypes.string.isRequired,
  onClick: PropTypes.string.isRequired,
};
