/* eslint-disable no-use-before-define */
import React, { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DatePickerH from "elements/DatePickerH";
import InputValue from "elements/InputValue";
import TextArea from "elements/TextArea";
import * as ConstDate from "elements/data/ConstDate";
import Form from "layouts/transaccionesAhorros/helpers/Form";
import useForm from "elements/hooks/useForm";
import SelectG from "elements/SelectG";

// Context
import ClientsContext from "context/Clients/ClientsContext";

export default function DepositScreen() {
  const errorValues = {
    value: "",
    paymentType: "",
  };

  // eslint-disable-next-line consistent-return
  const validate = (fieldValues = values) => {
    const tempo = { ...errors };

    if ("value" in fieldValues)
      tempo.value = /^[0-9]{1,10}.[0-9]{2}$/.test(fieldValues.value)
        ? ""
        : "Llenar en el Formato Correcto el Campo";
    if ("paymentType" in fieldValues)
      tempo.paymentType =
        fieldValues.paymentType.length !== 0 ? "" : "Es obligatorio escoger una opción";
    setErrors({
      ...tempo,
    });
    if (fieldValues === values) return Object.values(tempo).every((x) => x === "");
  };

  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    {
      transactionDate: new Date(),
      actualBalance: "0",
      value: "0.00",
      paymentType: "",
      observation: "",
      receipt: 0,
    },
    true,
    validate,
    errorValues
  );

  const { id } = useParams();
  const navigate = useNavigate();
  const { clients, addClientHistory, sbNotification, controlInfo, uploadControlInfo } =
    useContext(ClientsContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (parseFloat(values.value, 10) !== 0) {
        values.value = parseFloat(values.value, 10);
        values.actualBalance = parseFloat(clients[id - 1].savingBalance, 10) + values.value;

        const newTransactionDate = values.transactionDate
          .toISOString()
          .split("T")[0]
          .replace("-", "/")
          .replace("-", "/");
        values.transactionDate = newTransactionDate;

        if (!values.observation) values.observation = "Ninguna";

        values.receipt = controlInfo.proofPaymentValue + 1;

        const newControlInfo = controlInfo;
        newControlInfo.proofPaymentValue = values.receipt;

        uploadControlInfo(newControlInfo);
        addClientHistory(id, values);
        resetForm();
        sbNotification({
          color: "info",
          icon: "check",
          tittle: "Ahorros",
          content: "Deposito agregado satisfactoriamente!!",
        });
        navigate("/inicio");
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
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

        <Grid item xs={0} md={1}>
          {}
        </Grid>

        <Grid item xs={12} sm={7} md={5} lg={4}>
          <MDTypography className="Subtitles" variant="h5">
            Forma de Pago:
          </MDTypography>
          <SelectG
            name="paymentType"
            label="Forma de Pago"
            value={values.paymentType}
            onChange={handleInputChange}
            options={ConstDate.getWaytoPay()}
            error={errors.paymentType}
            read=""
          />
        </Grid>

        <Grid item xs={12} sm={7} md={5} lg={4}>
          <MDTypography className="Subtitles" variant="h5">
            Valor a depositar:
          </MDTypography>
          <InputValue
            name="value"
            value={values.value}
            onChange={handleInputChange}
            error={errors.value}
            icon="$"
            position="start"
            read=""
          />
        </Grid>

        <Grid item xs={0} md={1}>
          {}
        </Grid>

        <Grid item xs={12} md={6} lg={7}>
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
            sx={{ background: "#1A73E8", "&:hover": { background: "#5499C7" } }}
          >
            DEPOSITAR
          </MDButton>
        </Grid>
      </Grid>
    </Form>
  );
}
