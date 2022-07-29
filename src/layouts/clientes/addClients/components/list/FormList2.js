import React from "react";
import PropTypes from "prop-types";
import * as ConstDate from "elements/data/ConstDate";
import Input from "elements/Input";
import SelectG from "elements/SelectG";
import DatePickerH from "elements/DatePickerH";

export default function FormList2(props) {
  const {
    valLastName,
    valMobile,
    valEmail,
    valBirthDate,
    valCivil,
    handleInputChange,
    errLastName,
    errMobile,
    errEmail,
    errCivil,
  } = props;

  return (
    <>
      <Input
        label="Apellidos"
        name="lastName"
        value={valLastName}
        onChange={handleInputChange}
        error={errLastName}
        read=""
      />
      <Input
        label="Número de teléfono"
        name="mobile"
        value={valMobile}
        onChange={handleInputChange}
        error={errMobile}
        read=""
      />
      <Input
        label="Email"
        name="email"
        value={valEmail}
        onChange={handleInputChange}
        error={errEmail}
        read=""
      />
      <DatePickerH
        name="birthDate"
        label="Fecha de Nacimiento"
        value={valBirthDate}
        onChange={handleInputChange}
      />
      <SelectG
        name="civil"
        label="Estado Civil"
        value={valCivil}
        onChange={handleInputChange}
        options={ConstDate.getCivilStatus()}
        error={errCivil}
      />
    </>
  );
}

FormList2.propTypes = {
  valLastName: PropTypes.string.isRequired,
  valMobile: PropTypes.string.isRequired,
  valEmail: PropTypes.string.isRequired,
  valCivil: PropTypes.string.isRequired,
  valBirthDate: PropTypes.instanceOf(Date).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  errLastName: PropTypes.string.isRequired,
  errMobile: PropTypes.string.isRequired,
  errEmail: PropTypes.string.isRequired,
  errCivil: PropTypes.string.isRequired,
};
