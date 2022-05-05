import React from "react";
import { Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import InputValue from "elements/InputValue";
import SelectG from "elements/SelectG";
import * as ConstDate from "elements/data/ConstDate";
import Form from "../helpers/Form";

export default function CreditSimulatorScreen() {
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
        <Grid item xs={4.5}>
          <InputValue />
          <Grid container>
            <Grid item xs={6}>
              <InputValue />
            </Grid>
            <Grid item xs={6}>
              <InputValue />
            </Grid>
          </Grid>
          <SelectG name="civil" label="Tarifa" options={ConstDate.getTariffItems()} />
        </Grid>
        <Grid item xs={4}>
          hola
        </Grid>
      </Grid>
    </Form>
  );
}
