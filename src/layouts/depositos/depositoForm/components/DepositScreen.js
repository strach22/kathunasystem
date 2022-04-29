import React from "react";
import { Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import DatePickerH from "elements/DatePickerH";
import useForm from "layouts/clientes/addClients/hooks/useForm";
import InputValue from "elements/InputValue";
import TextArea from "elements/TextArea";
import ButtonOk from "elements/ButtonOk";
import { Link } from "react-router-dom";
import Form from "../helpers/Form";

export default function DepositScreen() {
  const { values, handleInputChange, resetForm } = useForm({
    depositDate: new Date(),
    actualBalance: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={4}>
          <MDTypography className="Subtitles">Fecha de la transacción:</MDTypography>
        </Grid>
        <Grid item xs={8}>
          <DatePickerH
            name="depositDate"
            label="Fecha de transacción"
            value={values.depositDate}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={5}>
          <MDTypography className="Subtitles">Valor a depositar:</MDTypography>
          <InputValue
            name="actualBalance"
            value={values.actualBalance}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid xs={7}>
          <MDTypography className="Subtitles">Observaciones:</MDTypography>
          <TextArea
            minRows={3}
            maxRows={4}
            placeholder="Si existe alguna observación, puede ingresarla  en este apartado"
          />
        </Grid>
        <Grid item xs={12} lg={11}>
          <ButtonOk
            type="submit"
            text="DEPOSITAR"
            sx={{ background: "#42a5f5", "&:hover": { background: "#A4C7F7" } }}
          />
          <ButtonOk
            text="RESETEAR"
            onClick={resetForm}
            sx={{ background: "#DF9325", "&:hover": { background: "#E8C38F" } }}
          />
          <Link to="/depositos">
            <ButtonOk
              text="REGRESAR"
              onClick={resetForm}
              sx={{ background: "#AEB0B2", "&:hover": { background: "#CCC9C5" } }}
            />
          </Link>
        </Grid>
      </Grid>
    </Form>
  );
}
