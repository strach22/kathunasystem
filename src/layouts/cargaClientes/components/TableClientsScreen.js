/* eslint-disable object-shorthand */
import React, { useContext, useReducer, useState } from "react";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import { ExcelRenderer, OutTable } from "react-excel-renderer";
import { CircularProgress, Grid } from "@mui/material";
import ClientsContext from "context/Clients/ClientsContext";
import ExcelExport from "../element/ExcelExport";
import ActionReduce from "../element/ActionReduce";

export default function TableClientsScreen({ worksheets }) {
  const [state, setState] = useState({ cols: [], rows: [] });
  const [loading, setLoading] = useState(false);
  const [dataBase, dispatch] = useReducer(ActionReduce);
  const { uploadClients } = useContext(ClientsContext);

  const handleUpload = () => {
    if (dataBase) uploadClients(dataBase);
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

          const dataBaseTempo = {
            id: value[0],
            firstName: value[1],
            lastName: value[2],
            identification: value[3],
            mobile: value[4],
            secondMobile: value[5],
            tariff: value[6],
            civil: value[7],
            birthDate: value[8],
            creationDate: value[9],
            address: value[10],
            email: value[11],
            firstNameSpouse: value[12],
            lastNameSpouse: value[13],
            identificationSpouse: value[14],
            mobileSpouse: value[15],
            relationShip: value[16],
            firstNameRelationShip: value[17],
            lastNameRelationShip: value[18],
            mobileRelationShip: value[19],
            savingBalance: value[20],
            creditBalance: value[21],
            savingHistory: [],
          };

          String(value[0]);

          dispatch({
            type: "CLIENT_DATA",
            payload: dataBaseTempo,
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
          CARGAR DATOS DE LOS CLIENTES
        </MDTypography>

        <ExcelExport
          filename="Lista-de-clientes.xlsx"
          worksheets={worksheets}
          handleUpload={handleUpload}
        />
        <input id="excel-upload" type="file" onChange={uploadFile} />
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

TableClientsScreen.propTypes = {
  worksheets: PropTypes.string.isRequired,
};

// const valDate = parseInt(dataBaseTempo.birthDate.substring(0, 2), 10);
// const valMonth = parseInt(dataBaseTempo.birthDate.substring(3, 5), 10);
// const valYear = parseInt(dataBaseTempo.birthDate.substring(6, 10), 10);

// dataBaseTempo.birthDate = new Date();

// dataBaseTempo.birthDate.setDate(valDate);
// dataBaseTempo.birthDate.setMonth(valMonth);
// dataBaseTempo.birthDate.setFullYear(valYear);

// Si se quiere obtener en string:
// values.birthDate.toISOString().split("T")[0];
