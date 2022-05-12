/* eslint-disable no-use-before-define */
import React from "react";
import { Grid } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import InputValue from "elements/InputValue";
import DatePickerH from "elements/DatePickerH";
import SelectG from "elements/SelectG";
import useForm from "elements/hooks/useForm";
import Form from "../helpers/Form";
import listItems from "../helpers/sociosItems";

export default function Credit() {
  const errorValues = {
    loanValue: "",
    timePayYear: "",
    timePayMonth: "",
    guarantor: "",
  };

  // eslint-disable-next-line consistent-return
  const validate = (fieldValues = values) => {
    const tempo = { ...errors };

    if ("loanValue" in fieldValues)
      tempo.loanValue = /^[0-9]+$/.test(fieldValues.loanValue)
        ? ""
        : "Es Obligatorio llenar con Números este Campo";
    if ("timePayYear" in fieldValues)
      tempo.timePayYear = /^[0-9]+$/.test(fieldValues.timePayYear)
        ? ""
        : "Es Obligatorio Llenar este campo";
    if ("timePayMonth" in fieldValues)
      tempo.timePayMonth = /^[0-9]+$/.test(fieldValues.timePayMonth)
        ? ""
        : "Es Obligatorio Llenar este campo";
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
      loanValue: "0",
      timePayYear: "0",
      timePayMonth: "0",
      guarantor: "",
    },
    true,
    validate,
    errorValues
  );

  const { sociosItems } = listItems();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("hola DiUks");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={2.5}>
          <MDTypography className="Subtitles" variant="h5">
            Valor del Crédito:
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
            Fecha del Crédito:
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
            <Grid item xs={6} className="hola">
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
          <DatePickerH
            name="initialDate"
            label="Fecha del Crédito"
            value={values.initialDate}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <MDTypography className="Subtitles2" variant="h5">
            Garante:
          </MDTypography>
        </Grid>
        <Grid item xs={12}>
          <SelectG
            name="guarantor"
            label="Garante"
            value={values.guarantor}
            onChange={handleInputChange}
            options={sociosItems}
            error={errors.guarantor}
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <MDButton variant="text" size="large" type="submit">
          GENERAR
        </MDButton>
      </Grid>
    </Form>
  );
}
