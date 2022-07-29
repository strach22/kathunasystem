/* eslint-disable no-use-before-define */
import React, { useContext, useState } from "react";
import { Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import useForm from "../../../../elements/hooks/useForm";
import Form from "../helpers/Form";
import FormList1 from "./list/FormList1";
import FormList2 from "./list/FormList2";
import FormListSpouse from "./list/FormListSpouse";
import FormListRelationShip from "./list/FormListRelationShip";

import ClientsContext from "../../../../context/Clients/ClientsContext";

export default function FormScreen() {
  const { clients, clientInfo, resetClientInfo, updateClients, sbNotification } =
    useContext(ClientsContext);
  const navigate = useNavigate();

  const initialValues =
    clientInfo !== null
      ? clientInfo
      : {
          id: "0",
          firstName: "",
          lastName: "",
          identification: "",
          mobile: "",
          secondMobile: "",
          tariff: "",
          civil: "",
          birthDate: new Date(),
          creationDate: new Date(),
          address: "",
          email: "",
          firstNameSpouse: "",
          lastNameSpouse: "",
          identificationSpouse: "",
          mobileSpouse: "",
          relationShip: "",
          firstNameRelationShip: "",
          lastNameRelationShip: "",
          mobileRelationShip: "",
          identificationRelationShip: "",
          savingBalance: 0,
          creditBalance: 0,
          savingHistory: [],
          credits: [],
        };

  const errorValues = {
    firstName: "",
    lastName: "",
    identification: "",
    mobile: "",
    email: "",
    tariff: "",
    civil: "",
    address: "",
    relationShip: "",
    firstNameRelationShip: "",
    lastNameRelationShip: "",
    mobileRelationShip: "",
    identificationRelationShip: "",
    firstNameSpouse: "",
    lastNameSpouse: "",
    identificationSpouse: "",
    mobileSpouse: "",
    other: "",
  };

  // eslint-disable-next-line consistent-return
  const validate = (fieldValues = values) => {
    const tempo = { ...errors };
    const status = { ...state };
    if ("firstName" in fieldValues)
      tempo.firstName = fieldValues.firstName ? "" : "Este campo es obligatorio llenar";
    if ("lastName" in fieldValues)
      tempo.lastName = fieldValues.lastName ? "" : "Este campo es obligatorio llenar";
    if ("identification" in fieldValues)
      tempo.identification = /^[0-9]{10}$/.test(fieldValues.identification)
        ? ""
        : "Este campo es obligatorio llenar con 10 dígitos";
    if ("mobile" in fieldValues)
      tempo.mobile = /^[0-9]{10}$/.test(fieldValues.mobile)
        ? ""
        : "Este campo es obligatorio llenar con 10 dígitos";
    if ("email" in fieldValues)
      tempo.email = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
        fieldValues.email
      )
        ? ""
        : "La dirección de email no es válido";
    if ("address" in fieldValues)
      tempo.address = fieldValues.address ? "" : "Este campo es obligatorio llenar";

    if ("firstNameRelationShip" in fieldValues)
      tempo.firstNameRelationShip = fieldValues.firstNameRelationShip
        ? ""
        : "Este campo es obligatorio llenar";
    if ("lastNameRelationShip" in fieldValues)
      tempo.lastNameRelationShip = fieldValues.lastNameRelationShip
        ? ""
        : "Este campo es obligatorio llenar";
    if ("mobileRelationShip" in fieldValues)
      tempo.mobileRelationShip = /^[0-9]{10}$/.test(fieldValues.mobileRelationShip)
        ? ""
        : "Este campo es obligatorio llenar con 10 dígitos";
    if ("identificationRelationShip" in fieldValues)
      tempo.identificationRelationShip = /^[0-9]{10}$/.test(fieldValues.identificationRelationShip)
        ? ""
        : "Este campo es obligatorio llenar con 10 dígitos";
    if ("relationShip" in fieldValues)
      tempo.relationShip = fieldValues.relationShip ? "" : "Este campo es obligatorio llenar";
    if ("tariff" in fieldValues)
      tempo.tariff = fieldValues.tariff.length !== 0 ? "" : "Es obligatorio escoger una opción";

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
        tempo.identificationSpouse = /^[0-9]{10}$/.test(fieldValues.identificationSpouse)
          ? ""
          : "Este campo es obligatorio llenar con 10 dígitos";
      if ("mobileSpouse" in fieldValues)
        tempo.mobileSpouse = /^[0-9]{10}$/.test(fieldValues.mobileSpouse)
          ? ""
          : "Este campo es obligatorio llenar con 10 dígitos";
    }
    setErrors({
      ...tempo,
    });

    setState({
      ...status,
    });
    if (fieldValues === values) return Object.values(tempo).every((x) => x === "");
  };

  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    initialValues,
    true,
    validate,
    errorValues
  );

  const [state, setState] = useState({ civil: "false" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const newBirthDate = values.birthDate.toISOString().split("T")[0];
      const newCreationDate = values.creationDate.toISOString().split("T")[0];
      values.birthDate = newBirthDate;
      values.creationDate = newCreationDate;

      const newClients = clients;
      if (values.id === "0") {
        values.id = String(parseInt(clients[clients.length - 1].id, 10) + 1);
        newClients.push(values);
      } else {
        newClients[clients.map((el) => el.id).indexOf(values.id)] = values;
      }
      updateClients(newClients);
      resetForm();
      resetClientInfo();
      sbNotification({
        color: "info",
        icon: "check",
        tittle: "Clientes",
        content: `Cliente ${clientInfo ? "modificado" : "agregarado"} satisfactoriamente!!`,
      });
      navigate("/inicio");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <FormList1
            valFirstName={values.firstName}
            valIdentification={values.identification}
            valSecondMobile={values.secondMobile}
            valAddress={values.address}
            valTariff={values.tariff}
            handleInputChange={handleInputChange}
            errFirstName={errors.firstName}
            errIdentification={errors.identification}
            errAddress={errors.address}
            errTariff={errors.tariff}
            errOther={errors.other}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormList2
            valLastName={values.lastName}
            valMobile={values.mobile}
            valEmail={values.email}
            valBirthDate={values.birthDate}
            valCivil={values.civil}
            handleInputChange={handleInputChange}
            errLastName={errors.lastName}
            errMobile={errors.mobile}
            errEmail={errors.email}
            errCivil={errors.civil}
          />
        </Grid>
      </Grid>
      {state.civil === "true" && (
        <>
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
            />
          </MDBox>
        </>
      )}
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
        <MDTypography className="Subtitles">Datos del Parentesco</MDTypography>
      </MDBox>
      <MDBox pt={3}>
        <FormListRelationShip
          valFirstName={values.firstNameRelationShip}
          valLastName={values.lastNameRelationShip}
          valMobile={values.mobileRelationShip}
          valRelationShip={values.relationShip}
          valIdentification={values.identificationRelationShip}
          handleInputChange={handleInputChange}
          errFirstName={errors.firstNameRelationShip}
          errLastName={errors.lastNameRelationShip}
          errMobile={errors.mobileRelationShip}
          errRelationShip={errors.relationShip}
          errIdentification={errors.identificationRelationShip}
        />
      </MDBox>
      <Grid item xs={12}>
        <Link to="/clientes">
          <MDButton
            size="large"
            onClick={resetClientInfo}
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
          {clientInfo ? "EDITAR" : "AGREGAR"}
        </MDButton>
      </Grid>
    </Form>
  );
}
