/* eslint-disable no-use-before-define */
import React from "react";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
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
  secondMobile: "",
  email: "",
  address: "",
  tariff: "particular",
  civil: "",
  birthDate: new Date(),
  creationDate: new Date(),
  saldoAhorros: 0,
  saldoCredito: 0,
  firstNameSpouse: "",
  lastNameSpouse: "",
  identificationSpouse: "",
  mobileSpouse: "",
  firstNameGuarantor: "",
  lastNameGuarantor: "",
  mobileGuarantor: "",
  relationShipGuarantor: "",
};

export default function FormScreen() {
  // eslint-disable-next-line consistent-return
  const validate = (fieldValues = values) => {
    const tempo = { ...errors };
    const status = { ...state };
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

    if ("firstNameGuarantor" in fieldValues)
      tempo.firstNameGuarantor = fieldValues.firstNameGuarantor
        ? ""
        : "Este campo es obligatorio llenar";
    if ("lastNameGuarantor" in fieldValues)
      tempo.lastNameGuarantor = fieldValues.lastNameGuarantor
        ? ""
        : "Este campo es obligatorio llenar";
    if ("mobileGuarantor" in fieldValues)
      tempo.mobileGuarantor = /^[0-9]+$/.test(fieldValues.mobileGuarantor)
        ? ""
        : "Este campo es obligatorio llenar";
    if ("relationShipGuarantor" in fieldValues)
      tempo.relationShipGuarantor = fieldValues.relationShipGuarantor
        ? ""
        : "Este campo es obligatorio llenar";

    if ("civil" in fieldValues) {
      tempo.civil = fieldValues.civil.length !== 0 ? "" : "Es obligatorio escoger una opción";
      if (fieldValues.civil === "Unión Libre" || fieldValues.civil === "Casado/a") {
        status.civil = "true";
      } else {
        status.civil = "false";
        values.firstNameSpouse = "";
        values.lastNameSpouse = "";
        values.identificationSpouse = "";
        values.mobileSpouse = "";
      }
    }
    if (status.civil === "true") {
      if ("firstNameSpouse" in fieldValues)
        tempo.firstNameSpouse = fieldValues.firstNameSpouse
          ? ""
          : "Este campo es obligatorio llenar";
      if ("lastNameSpouse" in fieldValues)
        tempo.lastNameSpouse = fieldValues.lastNameSpouse ? "" : "Este campo es obligatorio llenar";
      if ("identificationSpouse" in fieldValues)
        tempo.identificationSpouse = /^[0-9]+$/.test(fieldValues.identificationSpouse)
          ? ""
          : "Este campo es obligatorio llenar";
      if ("mobileSpouse" in fieldValues)
        tempo.mobileSpouse = /^[0-9]+$/.test(fieldValues.mobileSpouse)
          ? ""
          : "Este campo es obligatorio llenar";
    }
    setErrors({
      ...tempo,
    });
    setState({
      ...status,
    });
    if (fieldValues === values) return Object.values(tempo).every((x) => x === "");
  };

  const { values, errors, setErrors, state, setState, handleInputChange, resetForm } = useForm(
    initialValues,
    true,
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const dateResume = birthDate.toISOString().split("T")[0];
    const dateResume2 = creationDate.toISOString().split("T")[0];

    if (validate()) {
      values.birthDate = dateResume;
      values.creationDate = dateResume2;
      values.id = clients[clients.length - 1].id + 1;
      clients.push(values);
      resetForm();
    }
  };

  const {
    firstName,
    lastName,
    identification,
    mobile,
    secondMobile,
    email,
    address,
    tariff,
    civil,
    birthDate,
    creationDate,
    firstNameSpouse,
    lastNameSpouse,
    identificationSpouse,
    mobileSpouse,
    firstNameGuarantor,
    lastNameGuarantor,
    mobileGuarantor,
    relationShipGuarantor,
  } = values;

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
            label="2do Número de teléfono (Opcional)"
            name="secondMobile"
            value={secondMobile}
            onChange={handleInputChange}
          />
          <Input
            label="Email"
            name="email"
            value={email}
            onChange={handleInputChange}
            error={errors.email}
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
          <Input
            label="Dirección"
            name="address"
            value={address}
            onChange={handleInputChange}
            error={errors.address}
          />
        </Grid>
      </Grid>
      <MDBox
        mx={13}
        mt={7}
        py={2}
        mb={2}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
      >
        <MDTypography className="Subtitles">Datos del Conyuge</MDTypography>
      </MDBox>
      <MDBox pt={3}>
        <Grid container>
          <Grid item xs={6}>
            <Input
              label="Nombres"
              name="firstNameSpouse"
              value={firstNameSpouse}
              onChange={handleInputChange}
              error={errors.firstNameSpouse}
              state={state.civil}
            />
            <Input
              label="Apellidos"
              name="lastNameSpouse"
              value={lastNameSpouse}
              onChange={handleInputChange}
              error={errors.lastNameSpouse}
              state={state.civil}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Cédula de Identidad"
              name="identificationSpouse"
              value={identificationSpouse}
              onChange={handleInputChange}
              error={errors.identificationSpouse}
              state={state.civil}
            />
            <Input
              label="Número de Teléfono"
              name="mobileSpouse"
              value={mobileSpouse}
              onChange={handleInputChange}
              error={errors.mobileSpouse}
              state={state.civil}
            />
          </Grid>
        </Grid>
      </MDBox>
      <MDBox
        mx={13}
        mt={7}
        py={2}
        mb={2}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
      >
        <MDTypography className="Subtitles">Datos del Garante</MDTypography>
      </MDBox>
      <MDBox pt={3}>
        <Grid container>
          <Grid item xs={6}>
            <Input
              label="Nombres"
              name="firstNameGuarantor"
              value={firstNameGuarantor}
              onChange={handleInputChange}
              error={errors.firstNameGuarantor}
            />
            <Input
              label="Apellidos"
              name="lastNameGuarantor"
              value={lastNameGuarantor}
              onChange={handleInputChange}
              error={errors.lastNameGuarantor}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Cédula de Identidad"
              name="mobileGuarantor"
              value={mobileGuarantor}
              onChange={handleInputChange}
              error={errors.mobileGuarantor}
            />
            <Input
              label="Parentesco"
              name="relationShipGuarantor"
              value={relationShipGuarantor}
              onChange={handleInputChange}
              error={errors.relationShipGuarantor}
            />
          </Grid>
        </Grid>
      </MDBox>
      <Grid item xs={12}>
        <ButtonOk type="submit" text="Agregar" sx={{ background: "#42a5f5" }} />
        <ButtonOk text="Resetear" onClick={resetForm} sx={{ background: "#f57c00" }} />
        <Link to="/clientes">
          <ButtonOk text="Regresar" onClick={resetForm} sx={{ background: "#e3f2fd" }} />
        </Link>
      </Grid>
    </Form>
  );
}
