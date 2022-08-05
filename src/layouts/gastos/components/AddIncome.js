/* eslint-disable no-use-before-define */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Grid } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DatePickerH from "elements/DatePickerH";
import InputValue from "elements/InputValue";
import TextArea from "elements/TextArea";
import useForm from "elements/hooks/useForm";
import Form from "layouts/transaccionesAhorros/helpers/Form";

import ClientsContext from "../../../context/Clients/ClientsContext";

export default function AddIncome() {
  const errorValues = {
    incomeValue: "",
  };

  // eslint-disable-next-line consistent-return
  const validate = (fieldValues = values) => {
    const tempo = { ...errors };

    if ("incomeValue" in fieldValues) {
      tempo.incomeValue = /^[0-9]{1,10}.[0-9]{2}$/.test(fieldValues.incomeValue)
        ? ""
        : "Llenar en el Formato Correcto el Campo";
    }
    setErrors({
      ...tempo,
    });
    if (fieldValues === values) return Object.values(tempo).every((x) => x === "");
  };

  const { values, errors, setErrors, handleInputChange } = useForm(
    {
      incomeDate: new Date(),
      incomeValue: "0.00",
      observation: "",
    },
    true,
    validate,
    errorValues
  );

  const { controlInfo, sbNotification, uploadControlInfo } = useContext(ClientsContext);
  const navigate = useNavigate();
  const [verification, setVerification] = useState("false");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (values.incomeValue === "0.00" || values.observation === "") {
        setVerification("true");
      } else {
        const newInitialDate = values.incomeDate
          .toISOString()
          .split("T")[0]
          .replace("-", "/")
          .replace("-", "/");
        values.incomeDate = newInitialDate;
        const newControlInfo = controlInfo;
        values.id = String(
          parseInt(controlInfo.incomesHystory[controlInfo.incomesHystory.length - 1].id, 10) + 1
        );
        values.incomeValue = parseFloat(values.incomeValue, 10);
        newControlInfo.totalIncomes += values.incomeValue;
        newControlInfo.incomesHystory.push(values);
        uploadControlInfo(newControlInfo);
        sbNotification({
          color: "info",
          icon: "check",
          tittle: "Agregar Ingreso",
          content: "Ingreso agregado satisfactoriamente!!",
        });
        navigate(`/inicio`);
      }
    }
  };

  useEffect(() => {
    setVerification("false");
  }, [values]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        {verification === "true" && (
          <Grid item xs={12}>
            <Alert severity="error">Debe ingresar un valor y/o la razón del ingreso</Alert>
          </Grid>
        )}

        <Grid item xs={12} sm={7} md={5} lg={4}>
          <MDTypography className="Subtitles" variant="h5">
            Fecha del Ingreso:
          </MDTypography>
          <DatePickerH
            name="incomeDate"
            label="Fecha del ingreso"
            value={values.incomeDate}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={0} md={1} lg={1.5}>
          {}
        </Grid>

        <Grid item xs={12} sm={7} md={5} lg={4}>
          <MDTypography className="Subtitles" variant="h5">
            Valor del Ingreso:
          </MDTypography>
          <InputValue
            name="incomeValue"
            value={values.incomeValue}
            onChange={handleInputChange}
            error={errors.incomeValue}
            icon="$"
            position="start"
            read=""
          />
        </Grid>

        <Grid item xs={12} md={11} lg={9.5}>
          <MDTypography className="Subtitles" variant="h5">
            Razón:
          </MDTypography>
          <TextArea
            name="observation"
            minRows={3}
            maxRows={4}
            value={values.observation}
            onChange={handleInputChange}
            placeholder="Razón del Ingreso"
          />
        </Grid>

        <Grid item xs={12} sm={5.8} md={4} lg={3}>
          <MDButton
            variant="text"
            size="large"
            onClick={() => navigate("/historial-ingresos")}
            sx={{ background: "#277F7F", "&:hover": { background: "#678989" } }}
          >
            Historial
          </MDButton>
        </Grid>
        <Grid item xs={0} sm={0.4}>
          {}
        </Grid>
        <Grid item xs={12} sm={5.8} md={4} lg={3}>
          <MDButton
            variant="text"
            size="large"
            type="submit"
            sx={{ background: "#1A73E8", "&:hover": { background: "#5499C7" } }}
          >
            GUARDAR
          </MDButton>
        </Grid>
      </Grid>
    </Form>
  );
}
