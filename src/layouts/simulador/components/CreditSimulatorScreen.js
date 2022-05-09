/* eslint-disable no-use-before-define */
import React from "react";
import { Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import InputValue from "elements/InputValue";
import SelectG from "elements/SelectG";
import * as ConstDate from "elements/data/ConstDate";
import MDButton from "components/MDButton";
import useForm from "elements/hooks/useForm";
import Form from "../helpers/Form";

export default function CreditSimulatorScreen() {
  const getInfo = (category, info) => (
    <Grid container>
      <Grid item xs={4.5}>
        <MDTypography className="SubtitlesInfo" variant="h5">
          {category}
        </MDTypography>
      </Grid>
      <Grid item xs={6}>
        <MDTypography className="SubtitlesValue" variant="h5">
          {info}
        </MDTypography>
      </Grid>
    </Grid>
  );

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

  console.log(errorValues, validate);

  const { values, errors, setErrors, handleInputChange } = useForm({
    loanValue: "0.00",
    timePayYear: "0",
    timePayMonth: "0",
    tariff: "",
  });

  return (
    <Form>
      <Grid container>
        <Grid item xs={2.5}>
          <MDTypography className="Subtitles" variant="h5">
            Valor del Préstamo:
          </MDTypography>
          <InputValue
            name="loanValue"
            value={values.loanValue}
            onChange={handleInputChange}
            icon="$"
            position="start"
          />
        </Grid>
        <Grid item xs={1}>
          {}
        </Grid>
        <Grid item xs={4}>
          <MDTypography className="Subtitles" variant="h5">
            Tiempo a Pagar:
          </MDTypography>
          <Grid container>
            <Grid item xs={6}>
              <InputValue
                name="timePayYear"
                value={values.timePayYear}
                onChange={handleInputChange}
                icon="años"
                position="end"
              />
            </Grid>
            <Grid item xs={6}>
              <InputValue
                name="timePayMonth"
                value={values.timePayMonth}
                onChange={handleInputChange}
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
          <MDTypography className="Subtitles" variant="h5">
            Tarifa:
          </MDTypography>
          <SelectG
            name="tariff"
            label="Tarifa"
            value={values.tariff}
            onChange={handleInputChange}
            options={ConstDate.getTariffItems()}
          />
        </Grid>
        <Grid item xs={12}>
          <MDButton size="large">GENERAR</MDButton>
        </Grid>
        {getInfo("Valor de la cuota periódicamente:", "$ 50")}
        {getInfo("Número de cuotas:", "362")}
        {getInfo("Total interés a pagar:", "$ 1852")}
      </Grid>
    </Form>
  );
}
