/* eslint-disable no-use-before-define */
import React, { useContext, useEffect, useState } from "react";
import { Alert, Grid } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import ClientsContext from "context/Clients/ClientsContext";
import DatePickerH from "elements/DatePickerH";
import useForm from "elements/hooks/useForm";
import InputValue from "elements/InputValue";
import SelectG from "elements/SelectG";
import TextArea from "elements/TextArea";
import * as ConstDate from "elements/data/ConstDate";
import FormSecundary from "layouts/credito/helpers/FormSecundary";

export default function MonthlyPayment() {
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
  const { clients, addCreditHistory, editSystemData, systemData, controlInfo, uploadControlInfo } =
    useContext(ClientsContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [idC, idF] = id.split("-");

  const i = clients.map((e) => e.id).indexOf(idC);
  const i2 = clients[i].credits.map((e) => e.id).indexOf(idF);

  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    {
      transactionDate: new Date(),
      paymentType: "",
      value: clients[i].credits[i2].monthlyPayment,
      observation: "",
      receipt: 0,
    },
    true,
    validate,
    errorValues
  );

  useEffect(() => {
    const nowState = clients[i].credits[i2].state;
    if (nowState === "Creado" || nowState === "Aprobado" || nowState === "Finalizado") {
      setRead("true");
      values.value = "0.00";
    }
  }, [clients[i].credits[i2].state]);

  const openSB = () => {
    const newSystemData = systemData;
    newSystemData.SBstate = true;
    newSystemData.SBinfo = {
      color: "success",
      icon: "check",
      tittle: "Creditos",
      content: "Pago de Credito satisfactorio!!",
    };
    editSystemData(newSystemData);
  };
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
        values.receipt = controlInfo.proofPaymentValue + 1;

        const newControlInfo = controlInfo;
        newControlInfo.proofPaymentValue = values.receipt;

        uploadControlInfo(newControlInfo);
        addCreditHistory(idC, idF, values);
        openSB();
        navigate("/inicio");
      }
    }
  };

  return (
    <FormSecundary onSubmit={handleSubmit}>
      <Grid container>
        {read === "true" && (
          <Grid item xs={12}>
            <Alert severity="warning">
              El estado actual del crédito se encuentra <b> {clients[i].credits[i2].state} </b>
            </Alert>
          </Grid>
        )}
        <Grid item xs={5.5}>
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
        <Grid item xs={6.5}>
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
        <Grid item xs={5.5}>
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
        <Grid item xs={6.5}>
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
        <Grid item xs={12} lg={11}>
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
          <MDButton
            variant="text"
            size="large"
            type="submit"
            sx={{ background: "#1A73E8", "&:hover": { background: "#5499C7" } }}
          >
            PAGAR
          </MDButton>
        </Grid>
      </Grid>
    </FormSecundary>
  );
}
