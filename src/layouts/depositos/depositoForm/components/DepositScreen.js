import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import useForm from "layouts/clientes/addClients/hooks/useForm";
import ButtonOk from "elements/ButtonOk";
import InputValue from "elements/InputValue";
import TextArea from "elements/TextArea";
import DatePickerH from "elements/DatePickerH";
import Form from "../helpers/Form";

import clients from "../../../../data/clients.json";

export default function DepositScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  // clients[id - 1].creationDate = new Date();
  // clients[id - 1].creationDate.setDate(5);

  // const valDate = parseInt(clients[id - 1].creationDate.substring(0, 2), 10);
  // const valMonth = parseInt(clients[id - 1].creationDate.substring(3, 5), 10);
  // const valYear = parseInt(clients[id - 1].creationDate.substring(6, 10), 10);

  // clients[id - 1].creationDate = new Date();

  // clients[id - 1].creationDate.setDate(valDate);
  // clients[id - 1].creationDate.setMonth(valMonth);
  // clients[id - 1].creationDate.setFullYear(valYear);

  const { values, handleInputChange, resetForm } = useForm(clients[id - 1]);

  const handleSubmit = (e) => {
    e.preventDefault();
    clients[id - 1].saldoAhorros += 10;
    navigate("/inicio");
    resetForm();
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
            value={values.creationDate}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={5}>
          <MDTypography className="Subtitles">Valor a depositar:</MDTypography>
          <InputValue name="deposit" value={values.deposit} onChange={handleInputChange} />
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
