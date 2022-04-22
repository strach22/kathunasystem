import React from "react";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import { Workbook } from "react-excel-workbook";

import ArticleIcon from "@mui/icons-material/Article";

export default function ExcelExport({ filename = "", worksheets = [] }) {
  return (
    <div>
      <Workbook
        filename={filename}
        element={
          <MDButton color="success" sx={{ marginBottom: "20px" }}>
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
    </div>
  );
}

ExcelExport.propTypes = {
  filename: PropTypes.string.isRequired,
  worksheets: PropTypes.string.isRequired,
};
