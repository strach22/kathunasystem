/* eslint-disable no-use-before-define */
import React from "react";
import { Box, Grid } from "@mui/material";
import Input from "../elements/Input";
import * as Helpers from "../helpers/Helpers";
import RadioG from "../elements/RadioG";
import SelectG from "../elements/SelectG";
import DatePickerH from "../elements/DatePickerH";
import CheckboxB from "../elements/CheckboxB";
import useForm from "../hooks/useForm";
import Form from "../helpers/Form";
import ButtonOk from "../elements/ButtonOk";

const initialValues = {
  id: 0,
  firstname: "",
  lastname: "",
  identification: "",
  mobile: "",
  email: "",
  direction: "",
  tariff: "",
  civil: "",
  birthDate: new Date(),
  agree: false,
};

export default function FormScreen() {
  // eslint-disable-next-line consistent-return
  const validate = (fieldValues = values) => {
    const tempo = { ...errors };
    if ("firstname" in fieldValues)
      tempo.firstname = fieldValues.firstname ? "" : "Este campo es obligatorio";
    if ("lastname" in fieldValues)
      tempo.lastname = fieldValues.lastname ? "" : "Este campo es obligatorio";
    if ("identification" in fieldValues)
      tempo.identification = fieldValues.identification ? "" : "Este campo es obligatorio";
    if ("mobile" in fieldValues)
      tempo.mobile = fieldValues.mobile.length > 9 ? "" : "Se requiere mínimo 10 números";
    if ("email" in fieldValues)
      tempo.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "La dirección de Emal no es válido";
    if ("direction" in fieldValues)
      tempo.direction = fieldValues.direction ? "" : "Este campo es obligatorio";
    if ("civil" in fieldValues)
      tempo.civil = fieldValues.tariff.civil !== 0 ? "" : "Este campo es obligatorio";
    setErrors({
      ...tempo,
    });
    if (fieldValues === values) return Object.values(tempo).every((x) => x === "");
  };

  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    initialValues,
    true,
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      resetForm();
    }
  };

  const {
    firstname,
    lastname,
    identification,
    mobile,
    email,
    direction,
    tariff,
    civil,
    birthDate,
    agree,
  } = values;

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Input
            label="Nombres"
            name="firstname"
            value={firstname}
            onChange={handleInputChange}
            error={errors.firstname}
          />
          <Input
            label="Apellidos"
            name="lastname"
            value={lastname}
            onChange={handleInputChange}
            error={errors.lastname}
          />
          <Input
            label="Cédula de Indentidad"
            name="identification"
            value={identification}
            onChange={handleInputChange}
            error={errors.identification}
          />
          <Input
            label="Número de teléfono"
            name="mobile"
            value={mobile}
            onChange={handleInputChange}
            error={errors.mobile}
          />
          <Input
            label="Email"
            name="email"
            value={email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <Input
            label="Dirección"
            name="direction"
            value={direction}
            onChange={handleInputChange}
            error={errors.direction}
          />
        </Grid>
        <Grid item xs={6}>
          <RadioG
            name="tariff"
            label="Tarifa"
            value={tariff}
            onChange={handleInputChange}
            items={Helpers.tariffItems()}
          />
          <SelectG
            name="civil"
            label="Estado Civil"
            value={civil}
            onChange={handleInputChange}
            options={Helpers.getCivilStatus()}
            error={errors.civil}
          />
          <Box sx={{ width: 335, margin: "3px 0px 15px 60px" }}>
            <DatePickerH
              name="birthDate"
              label="Fecha de Nacimiento"
              value={birthDate}
              onChange={handleInputChange}
            />
          </Box>

          <CheckboxB
            name="agree"
            label="Desea Agregar Cliente"
            value={agree}
            onChange={handleInputChange}
          />

          <div>
            <ButtonOk type="submit" text="Agregar" />
            <ButtonOk text="Resetear" color="success" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
