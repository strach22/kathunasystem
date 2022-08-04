/* eslint-disable no-use-before-define */
/* eslint-disable object-shorthand */
import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, CircularProgress, Grid } from "@mui/material";
import { ExcelRenderer, OutTable } from "react-excel-renderer";
import MDTypography from "components/MDTypography";
import ExcelExport from "layouts/cargaClientes/element/ExcelExport";
import ActionReduce from "layouts/cargaClientes/element/ActionReduce";
import useForm from "elements/hooks/useForm";
import InputValue from "elements/InputValue";
import DatePickerH from "elements/DatePickerH";
import SelectG from "elements/SelectG";
import listItems from "layouts/credito/helpers/sociosItems";
import ClientsContext from "context/Clients/ClientsContext";

// eslint-disable-next-line react/prop-types
export default function TableCreditScreen({ worksheets }) {
  const errorValues = {
    id: "",
    loanValue: "",
    interest: "",
    periods: "",
    actualLoan: "",
    guarantor: "",
    monthlyPayment: "",
    reserve: "",
  };

  // eslint-disable-next-line consistent-return
  const validate = (fieldValues = values) => {
    const tempo = { ...errors };

    if ("id" in fieldValues)
      tempo.id = /^[0-9]+$/.test(fieldValues.id) ? "" : "Es Obligatorio Llenar este campo";
    if ("loanValue" in fieldValues)
      tempo.loanValue = /^[1-9]{1}[0-9]+$/.test(fieldValues.loanValue)
        ? ""
        : "Es Obligatorio llenar este Campo";
    if ("actualLoan" in fieldValues)
      tempo.actualLoan = /^[0-9]{1,10}.[0-9]{2}$/.test(fieldValues.actualLoan)
        ? ""
        : "Es Obligatorio llenar este Campo";
    if ("monthlyPayment" in fieldValues)
      tempo.monthlyPayment = /^[0-9]{1,10}.[0-9]{2}$/.test(fieldValues.monthlyPayment)
        ? ""
        : "Es Obligatorio llenar este Campo";
    if ("reserve" in fieldValues)
      tempo.reserve = /^[0-9]{1,10}.[0-9]{2}$/.test(fieldValues.reserve)
        ? ""
        : "Es Obligatorio llenar este Campo";
    if ("interest" in fieldValues)
      tempo.interest = /^[0-9]{1,10}.[0-9]{2}$/.test(fieldValues.interest)
        ? ""
        : "Es Obligatorio Llenar este campo";
    if ("periods" in fieldValues)
      tempo.periods = /^[0-9]+$/.test(fieldValues.periods)
        ? ""
        : "Es Obligatorio Llenar este campo";
    if ("guarantor" in fieldValues)
      tempo.guarantor =
        fieldValues.guarantor.length !== 0 ? "" : "Es obligatorio escoger una opción";
    if (fieldValues.periods === "0") tempo.periods = "Es Obligatorio llenar este Campo";
    if (fieldValues.id === "0") tempo.id = "Es Obligatorio llenar este Campo";
    if (fieldValues.interest === "0.00") tempo.interest = "Es Obligatorio llenar este Campo";
    if (fieldValues.monthlyPayment === "0.00")
      tempo.monthlyPayment = "Es Obligatorio llenar este Campo";
    setErrors({
      ...tempo,
    });
    if (fieldValues === values) return Object.values(tempo).every((x) => x === "");
  };

  const { values, errors, setErrors, handleInputChange } = useForm(
    {
      initialDate: new Date(),
      id: "0",
      loanValue: "0",
      interest: "0.00",
      periods: "0",
      actualLoan: "0.00",
      monthlyPayment: "0.00",
      reserve: "0.00",
      guarantor: "",
      state: "",
      identificationGuarantor: "",
      auxGuarantor: [],
    },
    true,
    validate,
    errorValues
  );

  const { id } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({ cols: [], rows: [] });
  const [loading, setLoading] = useState(false);
  const [invalidState, setInvalidState] = useState({
    invalidFolder: false,
    invalidReceipt: [],
    invalidDate: "",
    invalidPeriod: "",
  });
  const [dataBase, dispatch] = useReducer(ActionReduce);
  const { clients, addClientCredit } = useContext(ClientsContext);

  const { sociosItems } = listItems();

  useEffect(() => {
    const completeName = `${clients[id - 1].firstName} ${clients[id - 1].lastName}`;
    values.auxGuarantor = sociosItems.filter((val) => val.title !== completeName);
  }, []);

  const handleUpload = () => {
    if (validate()) {
      if (dataBase) {
        const realFolder = clients.map((client) =>
          client.credits.filter((val) => val.id === values.id)
        );

        if (realFolder.flat().length === 0) {
          const savingHistoryClients = clients.map((val) => val.savingHistory);
          const creditClients = clients.map((val) => val.credits);
          const onlyCreditValues = creditClients.filter((val) => val.length).flat();
          const onlySavingHistoyValues = savingHistoryClients.filter((val) => val.length).flat();
          const onlyCreditHistoryValues = onlyCreditValues.map((val) => val.creditHistory).flat();

          const repeatedReceipts = [];

          for (let i = 0; i < dataBase.length; i += 1) {
            const findReceiptsSaving = onlySavingHistoyValues.find(
              (val) => val.receipt === dataBase[i].receipt
            );
            const findReceiptsCredit = onlyCreditHistoryValues.find(
              (val) => val.receipt === dataBase[i].receipt
            );

            if (findReceiptsSaving !== undefined) {
              repeatedReceipts.push(findReceiptsSaving.receipt);
            }
            if (findReceiptsCredit !== undefined) {
              repeatedReceipts.push(findReceiptsCredit.receipt);
            }
          }

          repeatedReceipts.sort((a, b) => a - b);
          setInvalidState({ invalidFolder: false, invalidReceipt: repeatedReceipts });

          if (repeatedReceipts.length === 0) {
            if (
              values.initialDate.toISOString().split("T")[0].replace("-", "/").replace("-", "/") <=
              dataBase[0].transactionDate
            ) {
              setInvalidState({
                invalidFolder: false,
                invalidReceipt: repeatedReceipts,
                invalidDate: "",
              });

              if (parseInt(values.periods, 10) >= parseInt(dataBase[dataBase.length - 1].id, 10)) {
                setInvalidState({
                  invalidFolder: false,
                  invalidReceipt: repeatedReceipts,
                  invalidDate: "",
                  invalidPeriod: "",
                });

                if (values.actualLoan === "0.00") values.state = "Finalizado";
                else values.state = "Entregado";

                values.identificationGuarantor = values.auxGuarantor.filter(
                  (val) => val.title === values.guarantor
                );

                const credit = {
                  id: values.id,
                  initialDate: values.initialDate
                    .toISOString()
                    .split("T")[0]
                    .replace("-", "/")
                    .replace("-", "/"),
                  loanValue: parseFloat(values.loanValue, 10),
                  interest: parseFloat(values.interest, 10),
                  periods: parseFloat(values.periods, 10),
                  actualLoan: parseFloat(values.actualLoan, 10),
                  reserve: parseFloat(values.reserve, 10),
                  state: values.state,
                  guarantor: values.guarantor,
                  identificationGuarantor: values.identificationGuarantor[0].ci,
                  monthlyPayment: parseFloat(values.monthlyPayment, 10),
                  creditHistory: dataBase,
                };

                addClientCredit(id, credit);
                navigate("/creditos");
              } else {
                setInvalidState({
                  ...invalidState,
                  invalidDate: "",
                  invalidPeriod: values.periods,
                });
              }
            } else {
              setInvalidState({
                ...invalidState,
                invalidDate: values.initialDate.toISOString().split("T")[0],
              });
            }
          }
        } else {
          setInvalidState({ ...invalidState, invalidFolder: true });
        }
      }
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
          const dataCreditsTempo = {
            id: String(data[i][0]),
            receipt: parseFloat(data[i][1], 10),
            transactionDate: data[i][2],
            value: parseFloat(data[i][3], 10),
            paymentType: data[i][4],
            observation: data[i][5],
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

  useEffect(() => {
    setInvalidState({ ...invalidState, invalidFolder: false });
  }, [values.id]);

  return (
    <div className="excel-import-container">
      <div className="file-upload">
        <MDTypography variant="h5">CARGAR CREDITO DEL CLIENTE</MDTypography>

        <form onSubmit={handleUpload}>
          <Grid container>
            <Grid item xs={12} sm={7} md={5} lg={4.5}>
              <MDTypography className="Subtitles" variant="h5">
                Número de Carpeta:
              </MDTypography>
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

            <Grid item xs={0} md={1.5}>
              {}
            </Grid>

            <Grid item xs={12} sm={7} md={5} lg={4.5}>
              <MDTypography className="Subtitles" variant="h5">
                Fecha del Crédito:
              </MDTypography>
              <DatePickerH
                name="initialDate"
                label="Fecha del Crédito"
                value={values.initialDate}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={7} md={5} lg={4.5}>
              <MDTypography className="Subtitles" variant="h5">
                Valor del Crédito:
              </MDTypography>
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

            <Grid item xs={0} md={1.5}>
              {}
            </Grid>

            <Grid item xs={12} sm={7} md={5} lg={4.5}>
              <MDTypography className="Subtitles" variant="h5">
                Cuotas:
              </MDTypography>
              <InputValue
                className="InputLoanValue"
                name="periods"
                value={values.periods}
                onChange={handleInputChange}
                error={errors.periods}
                icon="#"
                position="start"
              />
            </Grid>

            <Grid item xs={12} sm={7} md={5} lg={4.5}>
              <MDTypography className="Subtitles" variant="h5">
                Deuda Pendiente:
              </MDTypography>
              <InputValue
                className="InputLoanValue"
                name="actualLoan"
                value={values.actualLoan}
                onChange={handleInputChange}
                error={errors.actualLoan}
                icon="$"
                position="start"
              />
            </Grid>

            <Grid item xs={0} md={1.5}>
              {}
            </Grid>

            <Grid item xs={12} sm={7} md={5} lg={4.5}>
              <MDTypography className="Subtitles" variant="h5">
                Valor del Pago Mensual:
              </MDTypography>
              <InputValue
                className="InputLoanValue"
                name="monthlyPayment"
                value={values.monthlyPayment}
                onChange={handleInputChange}
                error={errors.monthlyPayment}
                icon="$"
                position="start"
              />
            </Grid>

            <Grid item xs={12} sm={7} md={5} lg={4.5}>
              <MDTypography className="Subtitles" variant="h5">
                Encaje Bancario:
              </MDTypography>
              <InputValue
                className="InputLoanValue"
                name="reserve"
                value={values.reserve}
                onChange={handleInputChange}
                error={errors.reserve}
                icon="$"
                position="start"
              />
            </Grid>

            <Grid item xs={0} md={1.5}>
              {}
            </Grid>

            <Grid item xs={12} sm={7} md={5} lg={4.5}>
              <MDTypography className="Subtitles" variant="h5">
                Interés:
              </MDTypography>
              <InputValue
                className="interestValueClass"
                name="interest"
                value={values.interest}
                onChange={handleInputChange}
                error={errors.interest}
                icon="%"
                position="end"
              />
            </Grid>

            <Grid item xs={12} sm={7} md={6} lg={5.5}>
              <MDTypography className="Subtitles" variant="h5">
                Garante:
              </MDTypography>
              <SelectG
                name="guarantor"
                label="Garante"
                value={values.guarantor}
                onChange={handleInputChange}
                options={values.auxGuarantor}
                error={errors.guarantor}
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
        {loading && <MDTypography>Cargando...</MDTypography>}
        {invalidState.invalidFolder && (
          <Alert severity="error">
            La carpeta número <b>{values.id}</b> ya existe. Por favor, cambie de valor y vuelva a
            subir el historial del crédito
          </Alert>
        )}
        {invalidState.invalidReceipt.length > 0 && (
          <Alert severity="warning">
            Los números de comprobantes: {invalidState.invalidReceipt.map((val) => `${val}, `)} ya
            existen en el sistema. Por favor, revise la infomación y vuelva a subir todo el
            historial de créditos.
          </Alert>
        )}
        {invalidState.invalidDate.length > 0 && (
          <Alert severity="warning">
            La fecha de creación <b>{invalidState.invalidDate}</b> está incorrecta. Por favor,
            verifique la fecha, vuelva a introducirla y presione el botón <b>SUBIR ARCHIVO</b>.
          </Alert>
        )}
        {invalidState.invalidPeriod.length > 0 && (
          <Alert severity="warning">
            El número total de cuotas (<b>{invalidState.invalidPeriod}</b>) es incorrecto. Por
            favor, verifique el número, vuelva a introducirlo y presione el botón{" "}
            <b>SUBIR ARCHIVO</b>.
          </Alert>
        )}
      </Grid>
      <div className="excel-table-import">
        <OutTable data={state.rows} columns={state.cols} tableClassName="excel-table" />
      </div>
    </div>
  );
}
