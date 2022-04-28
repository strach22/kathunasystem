import React from "react";
import PropTypes from "prop-types";
import Input from "../../../../../elements/Input";

export default function FormList1(props) {
  const {
    valFirstName,
    valLastName,
    valIdentification,
    valMobile,
    valSecondMobile,
    valEmail,
    handleInputChange,
    errFirstName,
    errLastName,
    errIdentification,
    errMobile,
    errEmail,
    state,
  } = props;

  return (
    <>
      <Input
        label="Nombres"
        name="firstName"
        value={valFirstName}
        onChange={handleInputChange}
        error={errFirstName}
        state={state}
      />
      <Input
        label="Apellidos"
        name="lastName"
        value={valLastName}
        onChange={handleInputChange}
        error={errLastName}
        state={state}
      />
      <Input
        label="Cédula de Indentidad"
        name="identification"
        value={valIdentification}
        onChange={handleInputChange}
        error={errIdentification}
        state={state}
      />
      <Input
        label="Número de teléfono"
        name="mobile"
        value={valMobile}
        onChange={handleInputChange}
        error={errMobile}
        state={state}
      />
      <Input
        label="2do Número de teléfono (Opcional)"
        name="secondMobile"
        value={valSecondMobile}
        onChange={handleInputChange}
        state={state}
      />
      <Input
        label="Email"
        name="email"
        value={valEmail}
        onChange={handleInputChange}
        error={errEmail}
        state={state}
      />
    </>
  );
}

FormList1.propTypes = {
  valFirstName: PropTypes.string.isRequired,
  valLastName: PropTypes.string.isRequired,
  valIdentification: PropTypes.string.isRequired,
  valMobile: PropTypes.string.isRequired,
  valSecondMobile: PropTypes.string.isRequired,
  valEmail: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  errFirstName: PropTypes.string.isRequired,
  errLastName: PropTypes.string.isRequired,
  errIdentification: PropTypes.string.isRequired,
  errMobile: PropTypes.string.isRequired,
  errEmail: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
};
