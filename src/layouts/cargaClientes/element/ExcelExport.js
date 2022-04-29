import React from "react";
// import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import { Workbook } from "react-excel-workbook";

import UploadIcon from "@mui/icons-material/Upload";
import ArticleIcon from "@mui/icons-material/Article";

export default function ExcelExport({ filename = "", worksheets = [], handleUpload }) {
  return (
    <Grid container>
      <Grid item xs={4}>
        <Workbook
          filename={filename}
          element={
            <MDButton color="success" sx={{ marginBottom: "20px", width: "80%", height: "10px" }}>
              <ArticleIcon color="dark" fontSize="large" sx={{ marginRight: 1 }} />
              Descargar Plantilla
            </MDButton>
          }
        >
          {worksheets.map(({ name, columns, data }) => (
            <Workbook.Sheet name={name} data={data}>
              {columns.map(({ label, value }) => (
                <Workbook.Column label={label} value={value} />
              ))}
            </Workbook.Sheet>
          ))}
        </Workbook>
      </Grid>

      <Grid item xs={4}>
        <MDButton
          // component={Link}
          // to="/clientes"
          onClick={handleUpload}
          color="info"
          sx={{ width: "80%", height: "10px" }}
        >
          <UploadIcon color="dark" fontSize="large" sx={{ marginRight: 1 }} />
          SUBIR ARCHIVO
        </MDButton>
      </Grid>
    </Grid>
  );
}

ExcelExport.propTypes = {
  filename: PropTypes.string.isRequired,
  worksheets: PropTypes.string.isRequired,
  handleUpload: PropTypes.func.isRequired,
};
