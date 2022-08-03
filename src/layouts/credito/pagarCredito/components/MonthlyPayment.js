/* eslint-disable no-use-before-define */
import React, { useContext, useEffect, useState } from "react";
import { Alert, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import ClientsContext from "context/Clients/ClientsContext";
import DatePickerH from "elements/DatePickerH";
import useForm from "elements/hooks/useForm";
import InputValue from "elements/InputValue";
import SelectG from "elements/SelectG";
import TextArea from "elements/TextArea";
import * as ConstDate from "elements/data/ConstDate";
import Form from "layouts/transaccionesAhorros/helpers/Form";

// eslint-disable-next-line react/prop-types
export default function MonthlyPayment({ i, i2 }) {
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
    if (read === "true") tempo.paymentType = "";
    setErrors({
      ...tempo,
    });
    if (fieldValues === values) return Object.values(tempo).every((x) => x === "");
  };

  const [read, setRead] = useState("false");
  const { clients, updateClients, sbNotification, controlInfo, uploadControlInfo } =
    useContext(ClientsContext);
  const navigate = useNavigate();

  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    {
      transactionDate: new Date(),
      paymentType: "",
      value: clients[i].credits[i2].monthlyPayment.toFixed(2),
      observation: "",
      receipt: 0,
    },
    true,
    validate,
    errorValues
  );

  useEffect(() => {
    const nowState = clients[i].credits[i2].state;
    if (nowState !== "Entregado") {
      setRead("true");
      values.value = "0.00";
    }
  }, [clients[i].credits[i2].state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (read === "false") {
      if (validate()) {
        const newTransactionDate = values.transactionDate
          .toISOString()
          .split("T")[0]
          .replace("-", "/")
          .replace("-", "/");
        values.transactionDate = newTransactionDate;
        if (!values.observation) values.observation = "Ninguna";

        values.id = String(clients[i].credits[i2].creditHistory.length + 1);
        values.value = parseFloat(values.value, 10);

        values.receipt = controlInfo.proofPaymentValue + 1;
        const newControlInfo = controlInfo;
        newControlInfo.proofPaymentValue = values.receipt;

        uploadControlInfo(newControlInfo);
        const newClients = clients;
        newClients[i].credits[i2].creditHistory.push(values);
        updateClients(newClients);
        sbNotification({
          color: "success",
          icon: "check",
          tittle: "Creditos",
          content: "Pago de Credito satisfactorio!!",
        });
        navigate("/inicio");
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        {read === "true" && (
          <Grid item xs={12}>
            <Alert severity="warning">
              El estado actual del crédito se encuentra <b> {clients[i].credits[i2].state} </b>
            </Alert>
          </Grid>
        )}
        <Grid item xs={12} sm={7} md={5} lg={4}>
          <MDTypography className="Subtitles" variant="h5">
            Fecha de Pago:
          </MDTypography>
          <DatePickerH
            name="transactionDate"
            label="Fecha de Pago"
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
            read={read}
          />
        </Grid>

        <Grid item xs={12} sm={7} md={5} lg={4}>
          <MDTypography className="Subtitles" variant="h5">
            Valor a Pagar:
          </MDTypography>
          <InputValue
            className="InputDepositValue"
            name="value"
            value={values.value}
            onChange={handleInputChange}
            error={errors.value}
            icon="$"
            position="start"
            read={read}
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
          <Link to="/creditos">
            <MDButton
              size="large"
              variant="text"
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
          {clients[i].credits[i2].state === "Entregado" && (
            <MDButton
              variant="text"
              size="large"
              type="submit"
              sx={{ background: "#1A73E8", "&:hover": { background: "#5499C7" } }}
            >
              PAGAR
            </MDButton>
          )}
        </Grid>
      </Grid>
    </Form>
  );
}
