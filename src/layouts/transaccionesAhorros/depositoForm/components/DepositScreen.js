/* eslint-disable no-use-before-define */
import React, { useContext } from "react";
import { Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import DatePickerH from "elements/DatePickerH";
import InputValue from "elements/InputValue";
import TextArea from "elements/TextArea";
import ButtonOk from "elements/ButtonOk";
import { Link, useNavigate, useParams } from "react-router-dom";
import ClientsContext from "context/Clients/ClientsContext";
import Form from "layouts/transaccionesAhorros/helpers/Form";
import useForm from "elements/hooks/useForm";

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
        : "Obligatorio llenar el campo. No se permite letras";
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
      value: 0,
      observation: "",
    },
    true,
    validate,
    errorValues
  );

  const { id } = useParams();
  const navigate = useNavigate();
  const { clients } = useContext(ClientsContext);

  const newId = clients.map((e) => e.id).indexOf(id);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // const newTransactionDate = values.transactionDate.toISOString().split("T")[0];
      // values.transactionDate = newTransactionDate;

      const auxSaving = clients[newId].savingBalance;
      const auxBalance = parseInt(values.actualBalance, 10);

      values.value = auxSaving + auxBalance;

      // addSavingValue(newId, values);

      resetForm();
      navigate("/clientes");
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
        <Grid item xs={7}>
          <MDTypography className="Subtitles" variant="h5">
            Observaciones:
          </MDTypography>
          <TextArea
            name="observation"
            minRows={3}
            maxRows={4}
            value={values.observation}
            onChange={handleInputChange}
            placeholder="Si existe alguna observación, puede ingresarla  en este apartado"
          />
        </Grid>
        <Grid item xs={12} lg={11}>
          <Link to="/transacciones-ahorros">
            <ButtonOk
              text="REGRESAR"
              onClick={resetForm}
              sx={{ background: "#7B809A", "&:hover": { background: "#99A3A4" } }}
            />
          </Link>
          <ButtonOk
            text="RESETEAR"
            onClick={resetForm}
            sx={{ background: "#FB8C00", "&:hover": { background: "#F5B041" } }}
          />
          <ButtonOk
            type="submit"
            text="DEPOSITAR"
            sx={{ background: "#1A73E8", "&:hover": { background: "#5499C7" } }}
          />
        </Grid>
      </Grid>
    </Form>
  );
}
