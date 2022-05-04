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
  const { clients, uploadClients } = useContext(ClientsContext);

  const handleUpload = () => {
    if (dataBase) {
      uploadClients(dataBase);
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
          const value = data[i].map((val) => val);

          const id = clients.length + i + 1;

          const dataBaseTempo = {
            id: String(id),
            firstName: value[0],
            lastName: value[1],
            identification: String(value[2]),
            mobile: String(value[3]),
            secondMobile: String(value[4]),
            tariff: value[5],
            civil: value[6],
            birthDate: value[7],
            creationDate: value[8],
            address: value[9],
            email: value[10],
            firstNameSpouse: value[11],
            lastNameSpouse: value[12],
            identificationSpouse: String(value[13]),
            mobileSpouse: String(value[14]),
            relationShip: value[15],
            firstNameRelationShip: value[16],
            lastNameRelationShip: value[17],
            mobileRelationShip: String(value[18]),
            savingBalance: 0,
            creditBalance: 0,
            savingHistory: [],
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
