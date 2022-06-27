/* eslint-disable object-shorthand */
import React, { useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { ExcelRenderer, OutTable } from "react-excel-renderer";
import MDTypography from "components/MDTypography";
import ClientsContext from "context/Clients/ClientsContext";
import ActionReduce from "../element/ActionReduce";
import ExcelExport from "../element/ExcelExport";

export default function TableHistoryScreen({ worksheets }) {
  const [stateData, setSatateData] = useState({ cols: [], rows: [] });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [dataBase, dispatch] = useReducer(ActionReduce);
  const { clients, addClientHistory } = useContext(ClientsContext);

  const handleUpload = () => {
    if (dataBase) {
      for (let i = 0; i < dataBase.length; i += 1) {
        for (let j = 0; j < clients.length; j += 1) {
          if (dataBase[i].identification === clients[j].identification) {
            if (dataBase[i].type === "Retiro") dataBase[i].transactionValue *= -1;
            delete dataBase[i].identification;
            delete dataBase[i].type;
            addClientHistory(clients[j].id, dataBase[i]);
          }
        }
      }
      navigate("/inicio");
    }
  };

  const uploadFile = (e) => {
    setLoading(true);
    const fileObj = e.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      if (!err) {
        const { cols, rows } = resp;
        setSatateData({
          cols: cols,
          rows: rows,
        });
        const data = [...rows];
        data.shift();

        for (let i = 0; i < data.length; i += 1) {
          const savingHistoryTempo = {
            receipt: data[i][0],
            identification: String(data[i][1]),
            type: data[i][2],
            transactionDate: data[i][3],
            value: data[i][4],
            actualBalance: data[i][5],
            paymentType: data[i][6],
            observation: data[i][7],
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
        <ExcelExport
          filename="Historial-de-Ahorros.xlsx"
          worksheets={worksheets}
          handleUpload={handleUpload}
        />
        <input id="excel-upload" type="file" onChange={uploadFile} />
      </div>

      <Grid container sx={{ marginTop: "3%" }}>
        {loading && <CircularProgress disableShrink color="inherit" sx={{ marginRight: "2%" }} />}
        {loading && <MDTypography>Cargando % </MDTypography>}
      </Grid>

      <div className="excel-table-import">
        <OutTable data={stateData.rows} columns={stateData.cols} tableClassName="excel-table" />
      </div>
    </div>
  );
}

TableHistoryScreen.propTypes = {
  worksheets: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      columns: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        })
      ).isRequired,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          cedulaIdentidad: PropTypes.string.isRequired,
          tipoTransaccion: PropTypes.string.isRequired,
          fecha: PropTypes.string.isRequired,
          valorTransaccion: PropTypes.string.isRequired,
          saldoFinal: PropTypes.string.isRequired,
          observacion: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
};
