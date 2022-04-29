/* eslint-disable no-use-before-define */
import React, { useContext } from "react";
import { Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import DatePickerH from "elements/DatePickerH";
import useForm from "layouts/clientes/addClients/hooks/useForm";
import InputValue from "elements/InputValue";
import TextArea from "elements/TextArea";
import ButtonOk from "elements/ButtonOk";
import { Link } from "react-router-dom";
import ClientsContext from "context/Clients/ClientsContext";
import Form from "../helpers/Form";

export default function DepositScreen() {
  const errorValues = {
    actualBalance: "",
  };

  // eslint-disable-next-line consistent-return
  const validate = (fieldValues = values) => {
    const tempo = { ...errors };

    if ("actualBalance" in fieldValues) {
      tempo.actualBalance = /^[0-9]+$/.test(fieldValues.actualBalance)
        ? ""
        : "Llenar el campo. No se permite letras";
    }
    setErrors({
      ...tempo,
    });
    if (fieldValues === values) return Object.values(tempo).every((x) => x === "");
  };

  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    {
      transactionDate: new Date(),
      actualBalance: 0,
    },
    true,
    validate,
    errorValues
  );

  const { clients } = useContext(ClientsContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const newTransactionDate = values.transactionDate.toISOString().split("T")[0];
      values.transactionDate = newTransactionDate;

      console.log(clients);

      // if (values.id === "0") values.id = String(parseInt(clients[clients.length - 1].id, 10) + 1);
      // addClient(values);
      // resetForm();
      // resetClientInfo();
      // navigate("/clientes");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={4}>
          <MDTypography className="Subtitles" variant="h5">
            Fecha de la transacción:
          </MDTypography>
        </Grid>
        <Grid item xs={8}>
          <DatePickerH
            name="transactionDate"
            label="Fecha de transacción"
            value={values.transactionDate}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={5}>
          <MDTypography className="Subtitles" variant="h5">
            Valor a depositar:
          </MDTypography>
          <InputValue
            name="actualBalance"
            value={values.actualBalance}
            onChange={handleInputChange}
            error={errors.actualBalance}
          />
        </Grid>
        <Grid xs={7}>
          <MDTypography className="Subtitles" variant="h5">
            Observaciones:
          </MDTypography>
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
