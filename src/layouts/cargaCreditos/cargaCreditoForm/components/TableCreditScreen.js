/* eslint-disable no-use-before-define */
/* eslint-disable object-shorthand */
import React, { useReducer, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { CircularProgress, Grid } from "@mui/material";
import { ExcelRenderer, OutTable } from "react-excel-renderer";
import MDTypography from "components/MDTypography";
import ExcelExport from "layouts/cargaClientes/element/ExcelExport";
import ActionReduce from "layouts/cargaClientes/element/ActionReduce";
import useForm from "elements/hooks/useForm";
import InputValue from "elements/InputValue";
import DatePickerH from "elements/DatePickerH";
import SelectG from "elements/SelectG";
import listItems from "layouts/credito/helpers/sociosItems";

// eslint-disable-next-line react/prop-types
export default function TableCreditScreen({ worksheets }) {
  const [state, setState] = useState({ cols: [], rows: [] });
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();
  const [dataBase, dispatch] = useReducer(ActionReduce);

  const errorValues = {
    id: "",
    loanValue: "",
    guarantor: "",
  };

  // eslint-disable-next-line consistent-return
  const validate = (fieldValues = values) => {
    const tempo = { ...errors };

    if ("loanValue" in fieldValues)
      tempo.loanValue = /^[1-9]{1}[0-9]+$/.test(fieldValues.loanValue)
        ? ""
        : "Es Obligatorio llenar con Números este Campo";
    if ("id" in fieldValues)
      tempo.id = /^[0-9]+$/.test(fieldValues.id) ? "" : "Es Obligatorio Llenar este campo";
    if ("guarantor" in fieldValues)
      tempo.guarantor =
        fieldValues.guarantor.length !== 0 ? "" : "Es obligatorio escoger una opción";
    setErrors({
      ...tempo,
    });
    if (fieldValues === values) return Object.values(tempo).every((x) => x === "");
  };

  const { values, errors, setErrors, handleInputChange } = useForm(
    {
      initialDate: new Date(),
      id: "",
      loanValue: "",
      guarantor: "",
    },
    true,
    validate,
    errorValues
  );

  const { sociosItems } = listItems();

  const handleUpload = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(dataBase);
      console.log(values);
      console.log(errors);
      // navigate("/creditos");
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

        <form onSubmit={handleUpload}>
          <Grid container>
            <Grid item xs={4.5}>
              <MDTypography className="Subtitles" variant="h5">
                Fecha del Crédito:
              </MDTypography>
            </Grid>
            <Grid item xs={1.5}>
              {}
            </Grid>
            <Grid item xs={3.38}>
              <MDTypography className="Subtitles" variant="h5">
                Valor del Crédito:
              </MDTypography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={4.5}>
              <DatePickerH
                name="initialDate"
                label="Fecha del Crédito"
                value={values.initialDate}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={1.5}>
              {}
            </Grid>
            <Grid item xs={3.38}>
              <InputValue
                className="InputLoanValue"
                name="loanValue"
                value={values.loanValue}
                onChange={handleInputChange}
                error={errors.loanValue}
                icon="$"
                position="start"
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={4.5}>
              <MDTypography className="Subtitles2" variant="h5">
                Garante:
              </MDTypography>
            </Grid>
            <Grid item xs={1.5}>
              {}
            </Grid>
            <Grid item xs={3.38}>
              <MDTypography className="Subtitles2" variant="h5">
                Número de Carpeta:
              </MDTypography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={4.5}>
              <SelectG
                name="guarantor"
                label="Garante"
                value={values.guarantor}
                onChange={handleInputChange}
                options={sociosItems}
                error={errors.guarantor}
              />
            </Grid>
            <Grid item xs={1.5}>
              {}
            </Grid>
            <Grid item xs={3.38}>
              <InputValue
                className="InputId"
                name="id"
                value={values.id}
                onChange={handleInputChange}
                error={errors.id}
                icon="#"
                position="start"
              />
            </Grid>
          </Grid>
        </form>

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
