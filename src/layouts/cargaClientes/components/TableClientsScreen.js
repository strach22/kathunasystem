/* eslint-disable object-shorthand */
import React, { useContext, useReducer, useState } from "react";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import { ExcelRenderer, OutTable } from "react-excel-renderer";
import { CircularProgress, Grid } from "@mui/material";
import ClientsContext from "context/Clients/ClientsContext";
import { useNavigate } from "react-router-dom";
import ExcelExport from "../element/ExcelExport";
import ActionReduce from "../element/ActionReduce";

export default function TableClientsScreen({ worksheets }) {
  const [state, setState] = useState({ cols: [], rows: [] });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [dataBase, dispatch] = useReducer(ActionReduce);
  const { clients, updateClients } = useContext(ClientsContext);

  const handleUpload = () => {
    if (dataBase) {
      updateClients(clients.concat(dataBase));
      navigate("/clientes");
    }
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
          const id = clients.length + i + 1;
          // const [birthYear, birthMonth, birthNowDate] = value[7].split("/");
          // const [creationYear, creationMonth, creationNowDate] = value[8].split("/");

          // const newBirthYear = parseInt(birthYear, 10);
          // const newBirthMonth = parseInt(birthMonth, 10);
          // const newBirthNowDate = parseInt(birthNowDate, 10);
          // const newCreationYear = parseInt(creationYear, 10);
          // const newCreationMonth = parseInt(creationMonth, 10);
          // const newCreationNowDate = parseInt(creationNowDate, 10);

          const dataBaseTempo = {
            id: String(id),
            firstName: data[i][0],
            lastName: data[i][1],
            identification: String(data[i][2]),
            mobile: String(data[i][3]),
            secondMobile: !data[i][4] ? "" : String(data[i][4]),
            tariff: data[i][5],
            civil: data[i][6],
            // birthDate: new Date(newBirthYear, newBirthMonth - 1, newBirthNowDate, 12),
            // creationDate: new Date(newCreationYear, newCreationMonth - 1, newCreationNowDate, 12),
            birthDate: data[i][7],
            creationDate: data[i][8],
            address: data[i][9],
            email: data[i][10],
            firstNameSpouse: !data[i][11] ? "" : data[i][11],
            lastNameSpouse: !data[i][12] ? "" : data[i][12],
            identificationSpouse: !data[i][13] ? "" : String(data[i][13]),
            mobileSpouse: !data[i][14] ? "" : String(data[i][14]),
            relationShip: data[i][15],
            firstNameRelationShip: data[i][16],
            lastNameRelationShip: data[i][17],
            identificationRelationShip: String(data[i][18]),
            mobileRelationShip: String(data[i][19]),
            savingBalance: 0,
            creditBalance: 0,
            savingHistory: [],
            credits: [],
          };

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

TableClientsScreen.propTypes = {
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
          nombres: PropTypes.string.isRequired,
          apellidos: PropTypes.string.isRequired,
          cedulaIdentidad: PropTypes.string.isRequired,
          numeroTelefono: PropTypes.string.isRequired,
          numeroTelefono2: PropTypes.string.isRequired,
          tarifa: PropTypes.string.isRequired,
          estadoCivil: PropTypes.string.isRequired,
          fechaNacimiento: PropTypes.string.isRequired,
          fechaCreacion: PropTypes.string.isRequired,
          direccion: PropTypes.string.isRequired,
          email: PropTypes.string.isRequired,
          nombresConyugue: PropTypes.string.isRequired,
          apellidosConyugue: PropTypes.string.isRequired,
          cedulaIdentidadConyugue: PropTypes.string.isRequired,
          telefonoConyugue: PropTypes.string.isRequired,
          parentesco: PropTypes.string.isRequired,
          nombresParentesco: PropTypes.string.isRequired,
          apellidosParentesco: PropTypes.string.isRequired,
          telefonoParentesco: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
};
