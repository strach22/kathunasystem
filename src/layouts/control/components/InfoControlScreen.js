/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import { Alert, Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import useForm from "elements/hooks/useForm";
import Input from "elements/Input";
import InputPassword from "elements/InputPassword";
import Form from "../helpers/Form";

export default function InfoControlScreen() {
  const errorValues = {
    nameVerification: "",
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
      nameBank: "",
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
  };

  const handleEdit = (e) => {
    e.preventDefault();
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
        <Grid item xs={4}>
          <MDTypography className="Subtitles" variant="h5">
            Nombre de la Caja de Ahorro:
          </MDTypography>
        </Grid>
        <Grid item xs={4}>
          <Input
            label="Caja de Ahorro"
            name="nameBank"
            value={values.nameBank}
            onChange={handleInputChange}
            read={read}
          />
        </Grid>
        <Grid item xs={2}>
          <MDButton
            variant="text"
            size="large"
            onClick={handleEdit}
            sx={{ background: "#1A73E8", "&:hover": { background: "#5499C7" } }}
          >
            EDITAR
          </MDButton>
        </Grid>
        <Grid item xs={2}>
          <MDButton
            variant="text"
            size="large"
            type="submit"
            sx={{ background: "#1A73E8", "&:hover": { background: "#5499C7" } }}
          >
            GUARDAR
          </MDButton>
        </Grid>

        {verification && (
          <Grid container>
            <Grid item xs={6}>
              <InputPassword
                label="Password"
                name="nameVerification"
                value={values.nameVerification}
                onChange={handleInputChange}
                error={errorNow}
              />
            </Grid>
            <Grid item xs={2}>
              <MDButton
                variant="text"
                size="large"
                onClick={handleVerification}
                sx={{ background: "#1A73E8", "&:hover": { background: "#5499C7" } }}
              >
                VERIFICAR
              </MDButton>
            </Grid>
          </Grid>
        )}
        {read === "false" && (
          <Grid item xs={6}>
            <Alert severity="success">Puede Editar el Nombre de la Caja de Ahorros</Alert>
          </Grid>
        )}
      </Grid>
    </Form>
  );
}
