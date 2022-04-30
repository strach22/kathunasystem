import { Grid, InputAdornment, OutlinedInput, TextareaAutosize } from "@mui/material";
import MDTypography from "components/MDTypography";
import ButtonOk from "elements/ButtonOk";
import DatePickerH from "elements/DatePickerH";
import useForm from "layouts/clientes/addClients/hooks/useForm";
import Form from "layouts/transaccionesAhorros/depositoForm/helpers/Form";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import clients from "../../../../data/clients.json";

export default function RetiroScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

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
            value={values.depositDate}
            obChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={5}>
          <MDTypography className="Subtitles">Valor a retirar:</MDTypography>
          <OutlinedInput
            id="outlined-adornment-amount"
            name="deposit"
            value={values.deposit}
            onChange={handleInputChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </Grid>
        <Grid xs={7}>
          <MDTypography className="Subtitles">Observaciones:</MDTypography>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            maxRows={4}
            placeholder="Si existe alguna observación, puede ingresarla  en este apartado"
            style={{
              width: "90%",
              height: "35%",
              padding: "2%",
              border: "1px double #CDD4D5",
              borderRadius: 7,
              fontSize: "80%",
            }}
          />
        </Grid>
        <Grid item xs={12} lg={11}>
          <ButtonOk
            type="submit"
            text="DEBITAR"
            sx={{ background: "#42a5f5", "&:hover": { background: "#A4C7F7" } }}
          />
          <ButtonOk
            text="RESETEAR"
            onClick={resetForm}
            sx={{ background: "#DF9325", "&:hover": { background: "#E8C38F" } }}
          />
          <Link to="/cargar-creditos">
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
