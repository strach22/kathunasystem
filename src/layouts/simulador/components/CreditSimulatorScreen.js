/* eslint-disable no-use-before-define */
import { useState, useContext } from "react";
import { Divider, Grid } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import InputValue from "elements/InputValue";
import SelectG from "elements/SelectG";
import * as ConstDate from "elements/data/ConstDate";
import useForm from "elements/hooks/useForm";

import ClientsContext from "context/Clients/ClientsContext";

import Form from "../helpers/Form";

// eslint-disable-next-line react/prop-types
export default function CreditSimulatorScreen({ setParameters }) {
  const { controlInfo } = useContext(ClientsContext);
  const [cuotaPeriodica, setCuotaPeriodica] = useState("$ 0");
  const [numeroCuotas, setNumeroCuotas] = useState("0");
  const [totalInteres, setTotalInteres] = useState("$ 0");

  const getInfo = (category, info) => (
    <Grid container>
      <Grid item xs={8.5}>
        <MDTypography className="SubtitlesInfo" variant="h6">
          {category}
        </MDTypography>
        <Divider sx={{ height: "1px" }} />
      </Grid>
      <Grid item xs={3.5}>
        <MDTypography className="SubtitlesValue" variant="h6">
          {info}
        </MDTypography>
      </Grid>
    </Grid>
  );

  const errorValues = {
    loanValue: "",
    timePayYear: "",
    timePayMonth: "",
    tariff: "",
  };

  // eslint-disable-next-line consistent-return
  const validate = (fieldValues = values) => {
    const tempo = { ...errors };

    if ("loanValue" in fieldValues)
      tempo.loanValue = /^[1-9]{1}[0-9]+$/.test(fieldValues.loanValue)
        ? ""
        : "Es Obligatorio Llenar con Números este Campo";
    if ("timePayYear" in fieldValues)
      tempo.timePayYear = /^[0-9]+$/.test(fieldValues.timePayYear)
        ? ""
        : "Es Obligatorio Llenar este campo";
    if ("timePayMonth" in fieldValues)
      tempo.timePayMonth = /^[0-9]+$/.test(fieldValues.timePayMonth)
        ? ""
        : "Es Obligatorio Llenar este campo";
    if ("tariff" in fieldValues)
      tempo.tariff = fieldValues.tariff.length !== 0 ? "" : "Es obligatorio escoger una opción";
    if (/^[0]+$/.test(fieldValues.timePayYear) && /^[0]+$/.test(fieldValues.timePayMonth)) {
      tempo.timePayMonth = "Es Obligatorio Llenar este campo";
      tempo.timePayYear = "Es Obligatorio Llenar este campo";
    }
    setErrors({
      ...tempo,
    });
    if (fieldValues === values) return Object.values(tempo).every((x) => x === "");
  };

  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    {
      loanValue: "0",
      timePayYear: "0",
      timePayMonth: "0",
      tariff: "",
    },
    true,
    validate,
    errorValues
  );

  const handleReset = (e) => {
    e.preventDefault();
    resetForm();
    setCuotaPeriodica("$ 0");
    setNumeroCuotas("0");
    setTotalInteres("$ 0");
    setParameters({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const interes =
        values.tariff === "Particular"
          ? controlInfo.particularCreditInterest / 100
          : controlInfo.partnerCreditInterest / 100;
      const periods = values.timePayYear * 12 + parseInt(values.timePayMonth, 10);
      const periodicFee = values.loanValue * (interes / (1 - (interes + 1) ** -periods));
      const periodicFeeDesgravamen =
        periodicFee + ((controlInfo.desgravament / 100) * values.loanValue) / periods;
      const totalFee = periodicFee * periods - values.loanValue;
      setCuotaPeriodica(`$ ${periodicFeeDesgravamen.toFixed(2)}`);
      setNumeroCuotas(periods);
      setTotalInteres(`$ ${totalFee.toFixed(2)}`);
      setParameters({
        loanValue: values.loanValue,
        periods,
        interes,
        desgravament: controlInfo.desgravament / 100,
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12} sm={8} md={4} lg={3.5}>
          <MDTypography className="Subtitles" variant="h5">
            Valor del Préstamo:
          </MDTypography>
          <InputValue
            className="InputLoanValue"
            name="loanValue"
            value={values.loanValue}
            onChange={handleInputChange}
            error={errors.loanValue}
            icon="$"
            position="start"
            read=""
          />
        </Grid>
        <Grid item xs={0} md={1}>
          {}
        </Grid>
        <Grid item xs={12} md={7} lg={6.5}>
          <MDTypography className="Subtitles" variant="h5">
            Tiempo a Pagar:
          </MDTypography>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <InputValue
                className="InputTimeValue"
                name="timePayYear"
                value={values.timePayYear}
                onChange={handleInputChange}
                error={errors.timePayYear}
                icon="años"
                position="end"
                read=""
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputValue
                className="InputTimeValue"
                name="timePayMonth"
                value={values.timePayMonth}
                onChange={handleInputChange}
                error={errors.timePayMonth}
                icon="meses"
                position="end"
                read=""
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} sm={8} md={4} lg={3.5}>
          <MDTypography className="Subtitles" variant="h5" sx={{ marginTop: "40px" }}>
            Tarifa:
          </MDTypography>
          <SelectG
            name="tariff"
            label="Tarifa"
            value={values.tariff}
            onChange={handleInputChange}
            options={ConstDate.getTariffItems()}
            error={errors.tariff}
          />
        </Grid>
        <Grid item xs={0} md={1}>
          {}
        </Grid>
        <Grid item xs={12} md={7} lg={7.5} sx={{ marginTop: "40px" }}>
          {getInfo("Valor de la cuota periódicamente:", cuotaPeriodica)}
          {getInfo("Número de cuotas:", numeroCuotas)}
          {getInfo("Total interés a pagar:", totalInteres)}
        </Grid>

        <Grid item xs={12} sm={5.8} md={4} lg={3}>
          <MDButton
            variant="text"
            size="large"
            onClick={handleReset}
            sx={{ background: "#D5923B", "&:hover": { background: "#D5AE7A" } }}
          >
            RESETEAR
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
            GENERAR
          </MDButton>
        </Grid>
      </Grid>
    </Form>
  );
}
