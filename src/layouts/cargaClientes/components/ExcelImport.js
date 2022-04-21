import React, { useState } from "react";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { ExcelRenderer, OutTable } from "react-excel-renderer";

export default function ExcelImport(uploadHandler) {
  const [state, setState] = useState({ cols: [], rows: [] });

  const uploadFile = (e) => {
    const fileObj = e.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      if (!err) {
        const { cols, rows } = resp;
        setState(
          {
            cols,
            rows,
          },
          () => {
            const data = [...rows];
            data.shift();
            uploadHandler(data);
          }
        );
      }
    });
  };

  return (
    <div>
      <div>
        <MDTypography>Subir Archivo</MDTypography>
        <input type="file" onChange={uploadFile} />
        <MDButton color="success">+</MDButton>
      </div>
      <div>
        <OutTable data={state.rows} columns={state.cols} />
      </div>
    </div>
  );
}
