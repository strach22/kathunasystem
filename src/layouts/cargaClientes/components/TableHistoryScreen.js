/* eslint-disable object-shorthand */
import React, { useContext, useReducer, useState } from "react";
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
  const [dataBase, dispatch] = useReducer(ActionReduce);
  const { clients, addClientHistory } = useContext(ClientsContext);
  // const { clients } = useContext(ClientsContext);

  const handleUpload = () => {
    const aux1 = dataBase.length;
    const aux2 = clients.length;

    for (let i = 0; i < aux1; i += 1) {
      for (let j = 0; j < aux2; j += 1) {
        const aux3 = dataBase[i].identification;
        const aux4 = parseInt(clients[j].identification, 10);
        const aux5 = dataBase[i].type;
        if (aux3 === aux4) {
          if (aux5 === "Retiro") dataBase[i].transactionValue *= -1;
          // delete dataBase[i].identification;
          // delete dataBase[i].type;
          addClientHistory(clients[j].id, dataBase[i]);
        }
      }
    }

    // for (let i = 0; i < dataBase.length; i += 1) {
    //   for (let j = 0; j < clients.length; j += 1) {
    //     if (dataBase[i].identification === clients[j].identification) {
    //       if (dataBase[i].type === "Retiro") dataBase[i].transactionValue *= -1;
    //       delete dataBase[i].identification;
    //       delete dataBase[i].type;
    //       console.log(clients[j].id);
    //       console.log(dataBase[i]);
    //       addClientHistory(clients[j].id, dataBase[i]);
    //     }
    //   }
    // }
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
          const value = data[i].map((val) => val);

          const savingHistoryTempo = {
            identification: value[0],
            type: value[1],
            transactionDate: value[2],
            value: value[3],
            actualBalance: value[4],
            observation: value[5],
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

      <Grid container>
        {loading && <CircularProgress disableShrink color="inherit" sx={{ marginRight: "4%" }} />}
        {loading && <MDTypography>Cargando ...</MDTypography>}
      </Grid>

      <div className="excel-table-import">
        <OutTable data={stateData.rows} columns={stateData.cols} tableClassName="excel-table" />
      </div>
    </div>
  );
}

TableHistoryScreen.propTypes = {
  worksheets: PropTypes.string.isRequired,
};
