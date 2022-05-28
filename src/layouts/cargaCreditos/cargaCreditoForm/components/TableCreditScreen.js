/* eslint-disable object-shorthand */
import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExcelRenderer, OutTable } from "react-excel-renderer";
import MDTypography from "components/MDTypography";
import ExcelExport from "layouts/cargaClientes/element/ExcelExport";
import ActionReduce from "layouts/cargaClientes/element/ActionReduce";
import { CircularProgress, Grid } from "@mui/material";

// eslint-disable-next-line react/prop-types
export default function TableCreditScreen({ worksheets }) {
  const [state, setState] = useState({ cols: [], rows: [] });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [dataBase, dispatch] = useReducer(ActionReduce);

  const handleUpload = () => {
    console.log(dataBase);
    navigate("/creditos");
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

          const dataCreditsTempo = {
            id: String(value[0]),
            quotaNumber: String(value[1]),
            paymentDate: String(value[2]),
            interest: String(value[3]),
            amortizedCapital: String(value[4]),
            desgravamen: String(value[5]),
            quotaValue: String(value[6]),
            remainingBalance: String(value[7]),
            paymentType: value[8],
            status: value[9],
          };

          dispatch({
            type: "CLIENT_DATA",
            payload: dataCreditsTempo,
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
          CARGAR CREDITO DEL CLIENTE
        </MDTypography>

        <ExcelExport
          filename="Credito-del-Cliente.xlsx"
          worksheets={worksheets}
          handleUpload={handleUpload}
        />
        <input id="excel-upload" type="file" onChange={uploadFile} />
      </div>

      <Grid container sx={{ marginTop: "3%" }}>
        {loading && <CircularProgress disableShrink color="inherit" sx={{ marginRight: "2%" }} />}
        {loading && <MDTypography>Cargando ...</MDTypography>}
      </Grid>
      <div className="excel-table-import">
        <OutTable data={state.rows} columns={state.cols} tableClassName="excel-table" />
      </div>
    </div>
  );
}
