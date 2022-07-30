/* eslint-disable no-use-before-define */
import React, { useContext } from "react";
import { Alert, Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import ClientsContext from "context/Clients/ClientsContext";
import DatePickerH from "elements/DatePickerH";
import useForm from "elements/hooks/useForm";
import InputValue from "elements/InputValue";
import TextArea from "elements/TextArea";
import Form from "layouts/transaccionesAhorros/helpers/Form";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function RetiroScreen() {
  const errorValues = {
    value: "",
  };

  // eslint-disable-next-line consistent-return
  const validate = (fieldValues = values) => {
    const tempo = { ...errors };

    if ("value" in fieldValues) {
      tempo.value = /^[0-9]{1,10}.[0-9]{2}$/.test(fieldValues.value)
        ? ""
        : "Llenar en el Formato Correcto el Campo";
    }
    setErrors({
      ...tempo,
    });
    if (fieldValues === values) return Object.values(tempo).every((x) => x === "");
  };

  const { values, errors, setErrors, handleInputChange, resetForm, ok, setOk } = useForm(
    {
      transactionDate: new Date(),
      actualBalance: "0",
      value: "0.00",
      paymentType: "Efectivo",
      observation: "",
      receipt: 0,
    },
    true,
    validate,
    errorValues,
    false
  );

  const { id } = useParams();
  const navigate = useNavigate();
  const { clients, addClientHistory, sbNotification, controlInfo, uploadControlInfo } =
    useContext(ClientsContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (parseFloat(values.value, 10) !== 0) {
        if (parseFloat(clients[id - 1].savingBalance, 10) >= parseFloat(values.value, 10)) {
          values.value = parseFloat(values.value, 10);
          values.actualBalance = parseFloat(clients[id - 1].savingBalance, 10) - values.value;

          const newTransactionDate = values.transactionDate
            .toISOString()
            .split("T")[0]
            .replace("-", "/")
            .replace("-", "/");
          values.transactionDate = newTransactionDate;

          values.value *= -1;

          if (!values.observation) values.observation = "Ninguna";

          values.receipt = controlInfo.proofPaymentValue + 1;

          const newControlInfo = controlInfo;
          newControlInfo.proofPaymentValue = values.receipt;

          uploadControlInfo(newControlInfo);

          setOk(false);
          addClientHistory(id, values);
          resetForm();
          sbNotification({
            color: "error",
            icon: "check",
            tittle: "Ahorros",
            content: "Retiro realizado satisfactoriamente!!",
          });
          navigate("/inicio");
        } else {
          setOk(true);
        }
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        {ok && (
          <Grid item xs={12}>
            <Alert severity="error">
              Error: No puede retirar: $ {values.value} porque solo cuenta con: ${" "}
              {clients[id - 1].savingBalance} en su cuenta de ahorros
            </Alert>
          </Grid>
        )}
        <Grid item xs={12} sm={7} md={5} lg={4}>
          <MDTypography className="Subtitles" variant="h5">
            Fecha de la transacción:
          </MDTypography>
          <DatePickerH
            name="transactionDate"
            label="Fecha de transacción"
            value={values.transactionDate}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={0} md={1} lg={1.5}>
          {}
        </Grid>

        <Grid item xs={12} sm={7} md={5} lg={4}>
          <MDTypography className="Subtitles" variant="h5">
            Valor a retirar:
          </MDTypography>
          <InputValue
            className="InputRetirValue"
            name="value"
            value={values.value}
            onChange={handleInputChange}
            error={errors.value}
            icon="$"
            position="start"
            read=""
          />
        </Grid>

        <Grid item xs={12} md={11} lg={9.5}>
          <MDTypography className="Subtitles" variant="h5">
            Observaciones:
          </MDTypography>
          <TextArea
            name="observation"
            minRows={3}
            maxRows={4}
            value={values.observation}
            onChange={handleInputChange}
            placeholder="Si existe alguna observación, puede ingresarla  en este apartado"
          />
        </Grid>

        <Grid item xs={12} sm={5.8} md={4} lg={3}>
          <Link to="/transacciones-ahorros">
            <MDButton
              variant="text"
              size="large"
              onClick={resetForm}
              sx={{ background: "#7B809A", "&:hover": { background: "#99A3A4" } }}
            >
              REGRESAR
            </MDButton>
          </Link>
        </Grid>
        <Grid item xs={0} sm={0.4}>
          {}
        </Grid>
        <Grid item xs={12} sm={5.8} md={4} lg={3}>
          <MDButton
            variant="text"
            size="large"
            type="submit"
            sx={{ background: "#BC2709", "&:hover": { background: "#D64E33" } }}
          >
            DEBITAR
          </MDButton>
        </Grid>
      </Grid>
    </Form>
  );
}
