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
  const { values, handleInputChange } = useForm({
    loanValue: "0.00",
    timePayYear: "0",
    timePayMonth: "0",
    tariff: "",
  });

  return (
    <Form>
      <Grid container>
        <Grid item xs={3.5}>
          <MDTypography className="Subtitles" variant="h5">
            Valor del Préstamo:
          </MDTypography>
          <MDTypography className="Subtitles" variant="h5">
            Tiempo a Pagar:
          </MDTypography>
          <MDTypography className="Subtitles" variant="h5">
            Tarifa:
          </MDTypography>
        </Grid>
        <Grid item xs={4}>
          <InputValue
            name="loanValue"
            value={values.loanValue}
            onChange={handleInputChange}
            icon="$"
            position="start"
          />
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
          <SelectG
            name="tariff"
            label="Tarifa"
            value={values.tariff}
            onChange={handleInputChange}
            options={ConstDate.getTariffItems()}
          />
        </Grid>
        <Grid item xs={4.5}>
          <MDTypography className="SubtitlesInfo" variant="h6">
            Valor de la cuota periódicamente:
          </MDTypography>
          <MDTypography className="SubtitlesValue" variant="h6">
            $ 50
          </MDTypography>
          <MDTypography className="SubtitlesInfo" variant="h6">
            Número de cuotas:
          </MDTypography>
          <MDTypography className="SubtitlesValue" variant="h6">
            362
          </MDTypography>
          <MDTypography className="SubtitlesInfo" variant="h6">
            Total interés a pagar:
          </MDTypography>
          <MDTypography className="SubtitlesValue" variant="h6">
            $ 1852
          </MDTypography>
        </Grid>
        <Grid item xs={6}>
          <MDButton size="large">GENERAR</MDButton>
        </Grid>
      </Grid>
    </Form>
  );
}
