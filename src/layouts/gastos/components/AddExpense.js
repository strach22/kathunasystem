/* eslint-disable no-use-before-define */
import React from "react";
import { Grid } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DatePickerH from "elements/DatePickerH";
import InputValue from "elements/InputValue";
import TextArea from "elements/TextArea";
import useForm from "elements/hooks/useForm";
import Form from "../helpers/Form";

export default function AddExpense() {
  const errorValues = {
    expenseValue: "",
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

  const { values, errors, setErrors, handleInputChange } = useForm(
    {
      expenseDate: new Date(),
      expenseValue: "0.00",
      observation: "",
    },
    true,
    validate,
    errorValues
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("hola Diuks");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={4}>
          <MDTypography className="Subtitles" variant="h5">
            Fecha del Gasto:
          </MDTypography>
        </Grid>
        <Grid item xs={8}>
          <DatePickerH
            name="expenseDate"
            label="Fecha del gasto"
            value={values.expenseDate}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={5}>
          <MDTypography className="Subtitles" variant="h5">
            Valor del Gasto:
          </MDTypography>
          <InputValue
            className="InputExpenseValue"
            name="expenseValue"
            value={values.expenseValue}
            onChange={handleInputChange}
            error={errors.expenseValue}
            icon="$"
            position="start"
          />
        </Grid>
        <Grid item xs={7}>
          <MDTypography className="Subtitles" variant="h5">
            Razón:
          </MDTypography>
          <TextArea
            name="observation"
            minRows={3}
            maxRows={4}
            value={values.observation}
            onChange={handleInputChange}
            placeholder="Razón del Gasto"
          />
        </Grid>
        <Grid item xs={12} lg={11}>
          <MDButton
            variant="text"
            size="large"
            type="submit"
            sx={{ background: "#1A73E8", "&:hover": { background: "#5499C7" } }}
          >
            GUARDAR
          </MDButton>
        </Grid>
      </Grid>
    </Form>
  );
}
