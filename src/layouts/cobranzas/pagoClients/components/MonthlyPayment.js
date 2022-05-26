/* eslint-disable no-use-before-define */
import React, { useContext } from "react";
import { Grid } from "@mui/material";
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
import Form from "layouts/cobranzas/helpers/Form";

export default function MonthlyPayment() {
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

  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    {
      transactionDate: new Date(),
      actualBalance: "0",
      value: "0.00",
      observation: "",
    },
    true,
    validate,
    errorValues
  );

  const { id } = useParams();
  const navigate = useNavigate();
  const { clients, addClientHistory } = useContext(ClientsContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const auxSaving = parseFloat(clients[id - 1].savingBalance, 10);
      const auxBalance = parseFloat(values.value, 10);

      if (auxBalance !== 0) {
        values.actualBalance = (auxSaving + auxBalance).toFixed(2);

        const newTransactionDate = values.transactionDate
          .toISOString()
          .split("T")[0]
          .replace("-", "/")
          .replace("-", "/");
        values.transactionDate = newTransactionDate;

        if (!values.observation) values.observation = "Ninguna";

        addClientHistory(id, values);

        resetForm();
        navigate("/inicio");
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={2.5}>
          <MDTypography className="Subtitles" variant="h5">
            Fecha de Pago:
          </MDTypography>
        </Grid>
        <Grid item xs={3}>
          <DatePickerH
            name="transactionDate"
            label="Fecha de transacción"
            value={values.transactionDate}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={2.5}>
          <MDTypography className="Subtitles" variant="h5">
            Forma de Pago:
          </MDTypography>
        </Grid>
        <Grid item xs={4}>
          <SelectG
            name="guarantor"
            label="Garante"
            value={values.guarantor}
            onChange={handleInputChange}
            options={ConstDate.getWaytoPay()}
            error={errors.guarantor}
          />
        </Grid>
        <Grid item xs={5.5}>
          <MDTypography className="Subtitles" variant="h5">
            Valor a depositar:
          </MDTypography>
          <InputValue
            className="InputDepositValue"
            name="value"
            value={values.value}
            onChange={handleInputChange}
            error={errors.value}
            icon="$"
            position="start"
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
          <Link to="/cobranzas">
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
            DEPOSITAR
          </MDButton>
        </Grid>
      </Grid>
    </Form>
  );
}
