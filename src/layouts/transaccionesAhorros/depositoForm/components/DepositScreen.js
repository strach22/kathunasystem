/* eslint-disable no-use-before-define */
import React, { useContext } from "react";
import { Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DatePickerH from "elements/DatePickerH";
import InputValue from "elements/InputValue";
import TextArea from "elements/TextArea";
import { Link, useNavigate, useParams } from "react-router-dom";
import ClientsContext from "context/Clients/ClientsContext";
import Form from "layouts/transaccionesAhorros/helpers/Form";
import useForm from "elements/hooks/useForm";

export default function DepositScreen() {
  const errorValues = {
    value: "",
  };

  // eslint-disable-next-line consistent-return
  const validate = (fieldValues = values) => {
    const tempo = { ...errors };

    if ("value" in fieldValues) {
      tempo.value = /^[0-9]+$/.test(fieldValues.value)
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
      actualBalance: "0",
      value: "0",
      observation: "",
    },
    true,
    validate,
    errorValues
  );

  const { id } = useParams();
  const navigate = useNavigate();
  const { clients, addClientHistory } = useContext(ClientsContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const auxSaving = clients[id - 1].savingBalance;
      const auxBalance = parseInt(values.value, 10);

      if (auxBalance !== 0) {
        values.actualBalance = auxSaving + auxBalance;

        const newTransactionDate = values.transactionDate
          .toISOString()
          .split("T")[0]
          .replace("-", "/")
          .replace("-", "/");
        values.transactionDate = newTransactionDate;

        if (!values.observation) values.observation = "Ninguna";

        addClientHistory(id, values);

        resetForm();
        navigate("/inicio");
      }
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
            name="value"
            value={values.value}
            onChange={handleInputChange}
            error={errors.value}
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
            <MDButton
              size="large"
              onClick={resetForm}
              sx={{ background: "#7B809A", "&:hover": { background: "#99A3A4" } }}
            >
              REGRESAR
            </MDButton>
          </Link>
          <MDButton
            size="large"
            variant="text"
            onClick={resetForm}
            sx={{ background: "#FB8C00", "&:hover": { background: "#F5B041" } }}
          >
            RESETEAR
          </MDButton>
          <MDButton
            variant="text"
            size="large"
            type="submit"
            sx={{ background: "#1A73E8", "&:hover": { background: "#5499C7" } }}
          >
            DEPOSITAR
          </MDButton>
        </Grid>
      </Grid>
    </Form>
  );
}
