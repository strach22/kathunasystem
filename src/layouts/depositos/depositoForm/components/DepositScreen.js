import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Grid, InputAdornment, OutlinedInput, TextareaAutosize } from "@mui/material";
import MDTypography from "components/MDTypography";
import useForm from "layouts/clientes/addClients/hooks/useForm";
import MDButton from "components/MDButton";
import DatePickerH from "../../../../elements/DatePickerH";
import Form from "../helpers/Form";

import clients from "../../../../data/clients.json";

export default function DepositScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const depositar = () => {
    clients[id - 1].saldoAhorros += 10;
    navigate("/inicio");
  };

  const { values, handleInputChange } = useForm(clients[id - 1]);

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
            obChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <MDTypography className="Subtitles">Valor a depositar:</MDTypography>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={values.deposit}
            onChange={handleInputChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            inputProps={{ inputMode: "numeric" }}
          />
        </Grid>
        <Grid xs={6}>
          <MDTypography className="Subtitles">Observaciones:</MDTypography>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            maxRows={4}
            placeholder="Si existe alguna observación, puede ingresarla  en este apartado"
            style={{ width: 200 }}
          />
        </Grid>
        <Grid item xs={12} lg={11}>
          <Link to="/depositos">
            <MDButton color="secondary" sx={{ marginLeft: 2 }}>
              REGRESAR
            </MDButton>
          </Link>
          <MDButton color="info" onClick={depositar} sx={{ marginLeft: 2 }}>
            DEPOSITAR
          </MDButton>
          <MDButton color="error" sx={{ marginLeft: 2 }}>
            Resetear
          </MDButton>
        </Grid>
      </Grid>
    </Form>
  );
}
