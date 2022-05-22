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

    if ("nameVerification" in fieldValues) {
      tempo.nameVerification =
        fieldValues.nameVerification === "diUks" ? "" : "La Contraseña es Incorrecta";
    }
    setErrors({
      ...tempo,
    });
    if (fieldValues === values) return Object.values(tempo).every((x) => x === "");
  };

  const { values, errors, setErrors, handleInputChange } = useForm(
    {
      particularSavingInterest: "",
      particularCreditInterest: "",
      socioSavingInterest: "",
      socioCreditInterest: "",
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
    if (values.nameVerification === "diUks") {
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
          <MDTypography className="Subtitles" variant="h5">
            INTERÉS PARA CAJA DE AHORRO
          </MDTypography>
        </Grid>

        <Grid item xs={3}>
          <MDTypography className="Subtitles" variant="h6">
            Clientes Particulares
          </MDTypography>
        </Grid>

        <Grid item xs={3.7}>
          <InputValue
            className="InputInterest"
            name="particularSavingInterest"
            value={values.particularSavingInterest}
            onChange={handleInputChange}
            icon="%"
            position="end"
          />
        </Grid>

        <Grid item xs={1.6}>
          <MDTypography className="Subtitles" variant="h6">
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
          />
        </Grid>

        <Grid item xs={12}>
          <MDTypography className="Subtitles" variant="h5">
            INTERÉS PARA CRÉDITOS
          </MDTypography>
        </Grid>

        <Grid item xs={3}>
          <MDTypography className="Subtitles" variant="h6">
            Clientes Particulares
          </MDTypography>
        </Grid>

        <Grid item xs={3.7}>
          <InputValue
            className="InputInterest"
            name="particularSavingInterest"
            value={values.particularSavingInterest}
            onChange={handleInputChange}
            icon="%"
            position="end"
          />
        </Grid>

        <Grid item xs={1.6}>
          <MDTypography className="Subtitles" variant="h6">
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
            <Alert severity="success">Puede Editar el Nombre de la Caja de Ahorros</Alert>
          </Grid>
        )}
      </Grid>
    </Form>
  );
}
