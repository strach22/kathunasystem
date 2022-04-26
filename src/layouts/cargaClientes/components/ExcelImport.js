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
            tempo: 18,
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
            savingHistory: [
              {
                type: "",
                transactionDate: "",
                transactionValue: "",
                actualBalance: "",
              },
            ],
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
