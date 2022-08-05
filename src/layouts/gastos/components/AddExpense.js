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

export default function AddExpense() {
  const errorValues = {
    expenseValue: "",
  };

  // eslint-disable-next-line consistent-return
  const validate = (fieldValues = values) => {
    const tempo = { ...errors };

    if ("expenseValue" in fieldValues) {
      tempo.expenseValue = /^[0-9]{1,10}.[0-9]{2}$/.test(fieldValues.expenseValue)
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
      expenseDate: new Date(),
      expenseValue: "0.00",
      observation: "",
    },
    true,
    validate,
    errorValues
  );

  const { controlInfo, uploadControlInfo, sbNotification } = useContext(ClientsContext);
  const navigate = useNavigate();
  const [verification, setVerification] = useState("false");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (values.expenseValue === "0.00" || values.observation === "") {
        setVerification("true");
      } else {
        const newInitialDate = values.expenseDate
          .toISOString()
          .split("T")[0]
          .replace("-", "/")
          .replace("-", "/");
        values.expenseDate = newInitialDate;
        const newControlInfo = controlInfo;
        values.id = String(
          parseInt(controlInfo.expensesHystory[controlInfo.expensesHystory.length - 1].id, 10) + 1
        );
        values.expenseValue = parseFloat(values.expenseValue, 10);
        newControlInfo.totalExpenses += values.expenseValue;
        newControlInfo.expensesHystory.push(values);
        uploadControlInfo(newControlInfo);
        sbNotification({
          color: "info",
          icon: "check",
          tittle: "Agregar Gasto",
          content: "Gasto agregado satisfactoriamente!!",
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
            <Alert severity="error">Debe ingresar un valor y/o la razón del gasto</Alert>
          </Grid>
        )}

        <Grid item xs={12} sm={7} md={5} lg={4}>
          <MDTypography className="Subtitles" variant="h5">
            Fecha del Gasto:
          </MDTypography>
          <DatePickerH
            name="expenseDate"
            label="Fecha del gasto"
            value={values.expenseDate}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={0} md={1} lg={1.5}>
          {}
        </Grid>

        <Grid item xs={12} sm={7} md={5} lg={4}>
          <MDTypography className="Subtitles" variant="h5">
            Valor del Gasto:
          </MDTypography>
          <InputValue
            name="expenseValue"
            value={values.expenseValue}
            onChange={handleInputChange}
            error={errors.expenseValue}
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
            placeholder="Razón del Gasto"
          />
        </Grid>

        <Grid item xs={12} sm={5.8} md={4} lg={3}>
          <MDButton
            variant="text"
            size="large"
            onClick={() => navigate("/historial-gastos")}
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
