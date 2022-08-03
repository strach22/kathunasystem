import React from "react";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import { Workbook } from "react-excel-workbook";

import UploadIcon from "@mui/icons-material/Upload";
import ArticleIcon from "@mui/icons-material/Article";

export default function ExcelExport({ filename = "", worksheets = [], handleUpload }) {
  return (
    <Grid container>
      <Grid item xs={12} sm={6} md={5} lg={4}>
        <Workbook
          filename={filename}
          element={
            <MDButton color="success">
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

      <Grid item xs={12} sm={6} md={5} lg={4}>
        <MDButton onClick={handleUpload} color="info">
          <UploadIcon color="dark" fontSize="large" sx={{ marginRight: 1 }} />
          SUBIR ARCHIVO
        </MDButton>
      </Grid>
    </Grid>
  );
}

ExcelExport.propTypes = {
  filename: PropTypes.string.isRequired,
  worksheets: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      columns: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  handleUpload: PropTypes.func.isRequired,
};
