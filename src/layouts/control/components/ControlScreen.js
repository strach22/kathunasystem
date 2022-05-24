/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import { Alert, Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import useForm from "elements/hooks/useForm";
import InputValue from "elements/InputValue";
import InputPassword from "elements/InputPassword";
import Form from "../helpers/Form";

export default function ControlScreen() {
  const errorValues = {
    nameVerification: "Colocar Contraseña",
    socioCreditInterest: "",
    socioSavingInterest: "",
    particularCreditInterest: "",
    particularSavingInterest: "",
    desgravament: "",
    latePayment: "",
  };

  // eslint-disable-next-line consistent-return
  const validate = (fieldValues = values) => {
    const tempo = { ...errors };

    if ("particularSavingInterest" in fieldValues)
      tempo.particularSavingInterest = /^[0-9]{1,2}.[0-9]{2}$/.test(
        fieldValues.particularSavingInterest
      )
        ? ""
        : "Verifique el formato";
    if ("particularCreditInterest" in fieldValues)
      tempo.particularCreditInterest = /^[0-9]{1,2}.[0-9]{2}$/.test(
        fieldValues.particularCreditInterest
      )
        ? ""
        : "Verifique el formato";
    if ("socioSavingInterest" in fieldValues)
      tempo.socioSavingInterest = /^[0-9]{1,2}.[0-9]{2}$/.test(fieldValues.socioSavingInterest)
        ? ""
        : "Verifique el formato";
    if ("socioCreditInterest" in fieldValues)
      tempo.socioCreditInterest = /^[0-9]{1,2}.[0-9]{2}$/.test(fieldValues.socioCreditInterest)
        ? ""
        : "Verifique el formato";
    if ("desgravament" in fieldValues)
      tempo.desgravament = /^[0-9]{1,2}.[0-9]{2}$/.test(fieldValues.desgravament)
        ? ""
        : "Verifique el formato";
    if ("latePayment" in fieldValues)
      tempo.latePayment = /^[0-9]{1,2}.[0-9]{2}$/.test(fieldValues.latePayment)
        ? ""
        : "Verifique el formato";
    if ("nameVerification" in fieldValues)
      tempo.nameVerification =
        fieldValues.nameVerification === "123" ? "" : "La Contraseña es Incorrecta";

    setErrors({
      ...tempo,
    });
    if (fieldValues === values) return Object.values(tempo).every((x) => x === "");
  };

  const { values, errors, setErrors, handleInputChange } = useForm(
    {
      particularSavingInterest: "0.00",
      particularCreditInterest: "0.00",
      socioSavingInterest: "0.00",
      socioCreditInterest: "0.00",
      desgravament: "0.00",
      latePayment: "0.00",
      nameVerification: "",
    },
    true,
    validate,
    errorValues
  );

  const [read, setRead] = useState("true");
  const [verification, setVerification] = useState(false);
  const [errorNow, setErrorNow] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const auxVerification = Object.keys(errors).map((key) => {
      if (key === "nameVerification") return true;
      if (errors[key] === "Verifique el formato") return false;
      return true;
    });

    const auxValidation = auxVerification.filter((key) => key === false);

    if (auxValidation.length === 0) {
      setRead("true");
      errors.nameVerification = "Colocar Contraseña";
      console.log("Aquí va el código");
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    errors.nameVerification = "Colocar Contraseña";
    if (read === "true") {
      setVerification(!verification);
      values.nameVerification = "";
    }
  };

  const handleVerification = (e) => {
    e.preventDefault();
    if (values.nameVerification === "123") {
      setRead("false");
      setVerification(false);
      values.nameVerification = "";
    } else {
      setErrorNow(errors.nameVerification);
    }
  };

  useEffect(() => {
    setErrorNow("");
  }, [values.nameVerification]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <MDTypography className="title" variant="h5">
            INTERÉS PARA CAJA DE AHORRO
          </MDTypography>
        </Grid>

        <Grid item xs={3}>
          <MDTypography className="Subtitles2" variant="h6">
            Clientes Particulares
          </MDTypography>
        </Grid>

        <Grid item xs={3.7}>
          <InputValue
            className="InputInterest"
            name="particularSavingInterest"
            value={values.particularSavingInterest}
            onChange={handleInputChange}
            error={errors.particularSavingInterest}
            icon="%"
            position="end"
            read={read}
          />
        </Grid>

        <Grid item xs={1.6}>
          <MDTypography className="Subtitles2" variant="h6">
            Socios
          </MDTypography>
        </Grid>

        <Grid item xs={3.7}>
          <InputValue
            className="InputInterest"
            name="socioSavingInterest"
            value={values.socioSavingInterest}
            onChange={handleInputChange}
            error={errors.socioSavingInterest}
            icon="%"
            position="end"
            read={read}
          />
        </Grid>

        <Grid item xs={12}>
          <MDTypography className="title2" variant="h5">
            INTERÉS PARA CRÉDITOS
          </MDTypography>
        </Grid>

        <Grid item xs={3}>
          <MDTypography className="Subtitles2" variant="h6">
            Clientes Particulares
          </MDTypography>
        </Grid>

        <Grid item xs={3.7}>
          <InputValue
            className="InputInterest"
            name="particularCreditInterest"
            value={values.particularCreditInterest}
            onChange={handleInputChange}
            error={errors.particularCreditInterest}
            icon="%"
            position="end"
            read={read}
          />
        </Grid>

        <Grid item xs={1.6}>
          <MDTypography className="Subtitles2" variant="h6">
            Socios
          </MDTypography>
        </Grid>

        <Grid item xs={3.7}>
          <InputValue
            className="InputInterest"
            name="socioCreditInterest"
            value={values.socioCreditInterest}
            onChange={handleInputChange}
            error={errors.socioCreditInterest}
            icon="%"
            position="end"
            read={read}
          />
        </Grid>

        <Grid item xs={12}>
          <MDTypography className="title2" variant="h5">
            INTERÉS VARIOS
          </MDTypography>
        </Grid>

        <Grid item xs={3}>
          <MDTypography className="Subtitles2" variant="h6">
            Fondo Desgravament
          </MDTypography>
        </Grid>

        <Grid item xs={9}>
          <InputValue
            className="InputInterest"
            name="desgravament"
            value={values.desgravament}
            onChange={handleInputChange}
            error={errors.desgravament}
            icon="%"
            position="end"
            read={read}
          />
        </Grid>

        <Grid item xs={3} sx={{ margin: "25px 0px 60px 0px" }}>
          <MDTypography className="Subtitles2" variant="h6">
            Interés por Mora
          </MDTypography>
        </Grid>

        <Grid item xs={9} sx={{ marginTop: "25px" }}>
          <InputValue
            className="InputInterest"
            name="latePayment"
            value={values.latePayment}
            onChange={handleInputChange}
            error={errors.latePayment}
            icon="%"
            position="end"
            read={read}
          />
        </Grid>

        <Grid item xs={3}>
          <MDButton
            className="OkBottom"
            variant="text"
            size="large"
            onClick={handleEdit}
            sx={{ background: "#53B74B", "&:hover": { background: "#8CBC89" } }}
          >
            EDITAR
          </MDButton>
        </Grid>

        <Grid item xs={3}>
          <MDButton
            className="OkBottom"
            variant="text"
            size="large"
            type="submit"
            sx={{ background: "#1A73E8", "&:hover": { background: "#5499C7" } }}
          >
            GUARDAR
          </MDButton>
        </Grid>

        {verification && (
          <Grid item xs={12}>
            <MDBox
              mx={5}
              mt={7}
              py={4}
              px={3}
              variant="gradient"
              borderRadius="xxl"
              coloredShadow="dark"
              sx={{ background: "#F2F4F2" }}
            >
              <Grid container>
                <Grid item xs={5}>
                  <InputPassword
                    label="Password"
                    name="nameVerification"
                    value={values.nameVerification}
                    onChange={handleInputChange}
                    error={errorNow}
                  />
                </Grid>
                <Grid item xs={4}>
                  <MDButton
                    className="BottomVerification"
                    variant="text"
                    size="large"
                    onClick={handleVerification}
                  >
                    VERIFICAR
                  </MDButton>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        )}
        {read === "false" && (
          <Grid item xs={12}>
            <Alert severity="success">Puede Editar el porcentaje de interés</Alert>
          </Grid>
        )}
      </Grid>
    </Form>
  );
}
