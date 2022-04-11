/* eslint-disable no-use-before-define */
import React from "react";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import useForm from "../hooks/useForm";
import Form from "../helpers/Form";
import ButtonOk from "../elements/ButtonOk";
import clients from "../../../../data/clients.json";
import FormList1 from "../elements/list/FormList1";
import FormList2 from "../elements/list/FormList2";
import FormListSpouse from "../elements/list/FormListSpouse";
import FormListGuarantor from "../elements/list/FormListGuarantor";

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
    if (fieldValues === values) {
      return Object.values(tempo).every((x) => x === "");
    }
  };

  const { values, errors, setErrors, state, setState, handleInputChange, resetForm } = useForm(
    initialValues,
    true,
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const dateResume = values.birthDate.toISOString().split("T")[0];
    const dateResume2 = values.creationDate.toISOString().split("T")[0];

    if (validate()) {
      values.birthDate = dateResume;
      values.creationDate = dateResume2;
      values.id = clients[clients.length - 1].id + 1;
      clients.push(values);
      resetForm();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <FormList1
            valFirstName={values.firstName}
            valLastName={values.lastName}
            valIdentification={values.identification}
            valMobile={values.mobile}
            valSecondMobile={values.secondMobile}
            valEmail={values.email}
            handleInputChange={handleInputChange}
            errFirstName={errors.firstName}
            errLastName={errors.lastName}
            errIdentification={errors.identification}
            errMobile={errors.mobile}
            errEmail={errors.email}
          />
        </Grid>
        <Grid item xs={6}>
          <FormList2
            valTariff={values.tariff}
            valCivil={values.civil}
            valBirthDate={values.birthDate}
            valAddress={values.address}
            handleInputChange={handleInputChange}
            errCivil={errors.civil}
            errAddress={errors.address}
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
        <FormListSpouse
          valFirstName={values.firstNameSpouse}
          valLastName={values.lastNameSpouse}
          valIdentification={values.identificationSpouse}
          valMobile={values.mobileSpouse}
          handleInputChange={handleInputChange}
          errFirstName={errors.firstNameSpouse}
          errLastName={errors.lastNameSpouse}
          errIdentification={errors.identificationSpouse}
          errMobile={errors.mobileSpouse}
          state={state.civil}
        />
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
        <FormListGuarantor
          valFirstName={values.firstNameGuarantor}
          valLastName={values.lastNameGuarantor}
          valMobile={values.mobileGuarantor}
          valRelationShip={values.relationShipGuarantor}
          handleInputChange={handleInputChange}
          errFirstName={errors.firstNameGuarantor}
          errLastName={errors.lastNameGuarantor}
          errMobile={errors.mobileGuarantor}
          errRelationShip={errors.relationShipGuarantor}
        />
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
