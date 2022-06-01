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
import Form from "../helpers/Form";

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

  const { controlInfo, uploadControlInfo } = useContext(ClientsContext);
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
        values.id =
          parseInt(controlInfo.expensesHystory[controlInfo.expensesHystory.length - 1].id, 10) + 1;
        newControlInfo.totalExpenses += parseInt(values.expenseValue, 10);
        newControlInfo.expensesHystory.push(values);
        uploadControlInfo(newControlInfo);
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
        <Grid item xs={4}>
          <MDTypography className="Subtitles" variant="h5">
            Fecha del Gasto:
          </MDTypography>
        </Grid>
        <Grid item xs={8}>
          <DatePickerH
            name="expenseDate"
            label="Fecha del gasto"
            value={values.expenseDate}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={5}>
          <MDTypography className="Subtitles" variant="h5">
            Valor del Gasto:
          </MDTypography>
          <InputValue
            className="InputExpenseValue"
            name="expenseValue"
            value={values.expenseValue}
            onChange={handleInputChange}
            error={errors.expenseValue}
            icon="$"
            position="start"
          />
        </Grid>
        <Grid item xs={7}>
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
        {verification === "true" && (
          <Grid item xs={12}>
            <Alert severity="error">Debe ingresar un valor y/o la razón del gasto</Alert>
          </Grid>
        )}
        <Grid item xs={12} lg={11}>
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
