import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import * as ConstDate from "elements/data/ConstDate";
import Input from "elements/Input";
import SelectG from "elements/SelectG";
import DatePickerH from "elements/DatePickerH";

export default function FormList1(props) {
  const {
    valFirstName,
    valLastName,
    valIdentification,
    valMobile,
    valSecondMobile,
    valEmail,
    valAddress,
    valBirthDate,
    valTariff,
    valCivil,
    handleInputChange,
    errFirstName,
    errLastName,
    errIdentification,
    errMobile,
    errEmail,
    errAddress,
    errTariff,
    errCivil,
    errOther,
  } = props;

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Input
          label="Nombres"
          name="firstName"
          value={valFirstName}
          onChange={handleInputChange}
          error={errFirstName}
          read=""
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Input
          label="Apellidos"
          name="lastName"
          value={valLastName}
          onChange={handleInputChange}
          error={errLastName}
          read=""
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Input
          label="Cédula de Indentidad"
          name="identification"
          value={valIdentification}
          onChange={handleInputChange}
          error={errIdentification}
          read=""
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Input
          label="Número de teléfono"
          name="mobile"
          value={valMobile}
          onChange={handleInputChange}
          error={errMobile}
          read=""
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Input
          label="2do Número de teléfono (Opcional)"
          name="secondMobile"
          value={valSecondMobile}
          onChange={handleInputChange}
          error={errOther}
          read=""
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Input
          label="Email"
          name="email"
          value={valEmail}
          onChange={handleInputChange}
          error={errEmail}
          read=""
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Input
          label="Dirección"
          name="address"
          value={valAddress}
          onChange={handleInputChange}
          error={errAddress}
          read=""
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <DatePickerH
          name="birthDate"
          label="Fecha de Nacimiento"
          value={valBirthDate}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <SelectG
          name="tariff"
          label="Tarifa"
          value={valTariff}
          onChange={handleInputChange}
          options={ConstDate.getTariffItems()}
          error={errTariff}
          read=""
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <SelectG
          name="civil"
          label="Estado Civil"
          value={valCivil}
          onChange={handleInputChange}
          options={ConstDate.getCivilStatus()}
          error={errCivil}
          read=""
        />
      </Grid>
    </Grid>
  );
}

FormList1.propTypes = {
  valFirstName: PropTypes.string.isRequired,
  valLastName: PropTypes.string.isRequired,
  valIdentification: PropTypes.string.isRequired,
  valMobile: PropTypes.string.isRequired,
  valSecondMobile: PropTypes.string.isRequired,
  valEmail: PropTypes.string.isRequired,
  valAddress: PropTypes.string.isRequired,
  valBirthDate: PropTypes.instanceOf(Date).isRequired,
  valTariff: PropTypes.string.isRequired,
  valCivil: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  errFirstName: PropTypes.string.isRequired,
  errLastName: PropTypes.string.isRequired,
  errIdentification: PropTypes.string.isRequired,
  errMobile: PropTypes.string.isRequired,
  errEmail: PropTypes.string.isRequired,
  errAddress: PropTypes.string.isRequired,
  errTariff: PropTypes.string.isRequired,
  errCivil: PropTypes.string.isRequired,
  errOther: PropTypes.string.isRequired,
};
