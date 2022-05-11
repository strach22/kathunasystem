/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import { Divider, Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import InputValue from "elements/InputValue";
import SelectG from "elements/SelectG";
import * as ConstDate from "elements/data/ConstDate";
import MDButton from "components/MDButton";
import useForm from "elements/hooks/useForm";
import Form from "../helpers/Form";

export default function CreditSimulatorScreen() {
  const [cuotaPeriodica, setCuotaPeriodica] = useState("$ 0");
  const [numeroCuotas, setNumeroCuotas] = useState("0");
  const [totalInteres, setTotalInteres] = useState("$ 0");
  const getInfo = (category, info) => (
    <Grid container>
      <Grid item xs={4.5}>
        <MDTypography className="SubtitlesInfo" variant="h6">
          {category}
        </MDTypography>
        <Divider sx={{ height: "1px" }} />
      </Grid>
      <Grid item xs={3}>
        <MDTypography className="SubtitlesValue" variant="h6">
          {info}
        </MDTypography>
      </Grid>
    </Grid>
  );

  const errorValues = {
    loanValue: "",
    timePayYear: "",
    timePayMonth: "",
    tariff: "",
  };

  // eslint-disable-next-line consistent-return
  const validate = (fieldValues = values) => {
    const tempo = { ...errors };

    if ("loanValue" in fieldValues)
      tempo.loanValue = /^[0-9]{1,10}.[0-9]{2}$/.test(fieldValues.loanValue)
        ? ""
        : "Llenar en el Formato Correcto el Campo";
    if ("timePayYear" in fieldValues)
      tempo.timePayYear = /^[0-9]+$/.test(fieldValues.timePayYear)
        ? ""
        : "Es Obligatorio Llenar este campo";
    if ("timePayMonth" in fieldValues)
      tempo.timePayMonth = /^[0-9]+$/.test(fieldValues.timePayMonth)
        ? ""
        : "Es Obligatorio Llenar este campo";
    if ("tariff" in fieldValues)
      tempo.tariff = fieldValues.tariff.length !== 0 ? "" : "Es obligatorio escoger una opción";
    setErrors({
      ...tempo,
    });
    if (fieldValues === values) return Object.values(tempo).every((x) => x === "");
  };

  const { values, errors, setErrors, handleInputChange } = useForm(
    {
      loanValue: "0.00",
      timePayYear: "0",
      timePayMonth: "0",
      tariff: "",
    },
    true,
    validate,
    errorValues
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const auxLoanValue = parseFloat(values.loanValue, 10);
      const auxTimePayYear = parseFloat(values.timePayYear, 10);
      const auxTimePayMonth = parseFloat(values.timePayMonth, 10);
      if (auxLoanValue !== 0)
        if (!(auxTimePayYear === 0 && auxTimePayMonth === 0)) {
          const interes = values.tariff === "Particular" ? 0.03 : 0.025;
          const periods = values.timePayYear * 12 + parseInt(values.timePayMonth, 10);
          const periodicFee = values.loanValue * (interes / (1 - (interes + 1) ** -periods));
          const totalFee = periodicFee * periods - values.loanValue;
          setCuotaPeriodica(`$ ${periodicFee.toFixed(2)}`);
          setNumeroCuotas(periods);
          setTotalInteres(`$ ${totalFee.toFixed(2)}`);
        }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={2.5}>
          <MDTypography className="Subtitles" variant="h5">
            Valor del Préstamo:
          </MDTypography>
        </Grid>
        <Grid item xs={1}>
          {}
        </Grid>
        <Grid item xs={4}>
          <MDTypography className="Subtitles" variant="h5">
            Tiempo a Pagar:
          </MDTypography>
        </Grid>
        <Grid item xs={1}>
          {}
        </Grid>
        <Grid item xs={2.5}>
          <MDTypography className="Subtitles" variant="h5">
            Tarifa:
          </MDTypography>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={2.5}>
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
        <Grid item xs={1}>
          {}
        </Grid>
        <Grid item xs={4}>
          <Grid container>
            <Grid item xs={6}>
              <InputValue
                className="InputTimeValue"
                name="timePayYear"
                value={values.timePayYear}
                onChange={handleInputChange}
                error={errors.timePayYear}
                icon="años"
                position="end"
              />
            </Grid>
            <Grid item xs={6}>
              <InputValue
                className="InputTimeValue"
                name="timePayMonth"
                value={values.timePayMonth}
                onChange={handleInputChange}
                error={errors.timePayMonth}
                icon="meses"
                position="end"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          {}
        </Grid>
        <Grid item xs={2.5}>
          <SelectG
            name="tariff"
            label="Tarifa"
            value={values.tariff}
            onChange={handleInputChange}
            options={ConstDate.getTariffItems()}
            error={errors.tariff}
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <MDButton variant="text" size="large" type="submit">
          GENERAR
        </MDButton>
      </Grid>

      {getInfo("Valor de la cuota periódicamente:", cuotaPeriodica)}
      {getInfo("Número de cuotas:", numeroCuotas)}
      {getInfo("Total interés a pagar:", totalInteres)}
    </Form>
  );
}
