/* eslint-disable no-use-before-define */
import React from "react";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Input from "../elements/Input";
import * as ConstDate from "../helpers/ConstDate";
import RadioG from "../elements/RadioG";
import SelectG from "../elements/SelectG";
import DatePickerH from "../elements/DatePickerH";
import useForm from "../hooks/useForm";
import Form from "../helpers/Form";
import ButtonOk from "../elements/ButtonOk";
import clients from "../../../../data/clients.json";

const initialValues = {
  id: 0,
  firstName: "",
  lastName: "",
  identification: "",
  mobile: "",
  email: "",
  address: "",
  tariff: "particular",
  civil: "",
  birthDate: new Date(),
  // creationDate: new Date(),
};

export default function FormScreen() {
  // eslint-disable-next-line consistent-return
  const validate = (fieldValues = values) => {
    const tempo = { ...errors };
    if ("firstName" in fieldValues)
      tempo.firstName = fieldValues.firstName ? "" : "Este campo es obligatorio llenar";
    if ("lastName" in fieldValues)
      tempo.lastName = fieldValues.lastName ? "" : "Este campo es obligatorio llenar";
    if ("identification" in fieldValues)
      tempo.identification = /^[0-9]+$/.test(fieldValues.identification)
        ? ""
        : "Este campo es obligatorio llenar";
    if ("mobile" in fieldValues)
      tempo.mobile = /^[0-9]+$/.test(fieldValues.mobile) ? "" : "Este campo es obligatorio llenar";
    if ("email" in fieldValues)
      tempo.email = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
        fieldValues.email
      )
        ? ""
        : "La dirección de emal no es válido";
    if ("address" in fieldValues)
      tempo.address = fieldValues.address ? "" : "Este campo es obligatorio llenar";
    if ("civil" in fieldValues)
      tempo.civil = fieldValues.civil.length !== 0 ? "" : "Es obligatorio escoger una opción";
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
    const dateResume = birthDate.toISOString().split("T")[0];
    // console.log(values);

    if (validate()) {
      values.birthDate = dateResume;
      values.id = clients[clients.length - 1].id + 1;
      clients.push(values);
      resetForm();
    }
  };

  const { firstName, lastName, identification, mobile, email, address, tariff, civil, birthDate } =
    values;

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Input
            label="Nombres"
            name="firstName"
            value={firstName}
            onChange={handleInputChange}
            error={errors.firstName}
          />
          <Input
            label="Apellidos"
            name="lastName"
            value={lastName}
            onChange={handleInputChange}
            error={errors.lastName}
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
            name="address"
            value={address}
            onChange={handleInputChange}
            error={errors.address}
          />
        </Grid>
        <Grid item xs={6}>
          <RadioG
            name="tariff"
            label="Tarifa"
            value={tariff}
            onChange={handleInputChange}
            items={ConstDate.tariffItems()}
          />
          <SelectG
            name="civil"
            label="Estado Civil"
            value={civil}
            onChange={handleInputChange}
            options={ConstDate.getCivilStatus()}
            error={errors.civil}
          />
          <DatePickerH
            name="birthDate"
            label="Fecha de Nacimiento"
            value={birthDate}
            onChange={handleInputChange}
          />
          <Grid item xs={12} className="Botton-up">
            <ButtonOk type="submit" text="Agregar" />
            <ButtonOk text="Resetear" color="success" onClick={resetForm} />
          </Grid>
          <Grid item xs={12} className="Botton-down">
            <Link to="/clientes">
              <ButtonOk text="Regresar" color="warning" onClick={resetForm} />
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Form>
  );
}
