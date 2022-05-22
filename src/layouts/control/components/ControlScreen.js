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
    setRead("true");
    errors.nameVerification = "Colocar Contraseña";
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
            icon="%"
            position="end"
            read={read}
          />
        </Grid>

        <Grid item xs={12}>
          <MDTypography className="title" variant="h5">
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
