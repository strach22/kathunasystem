import React from "react";
import PropTypes from "prop-types";
import Input from "../Input";

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
  } = props;

  return (
    <>
      <Input
        label="Nombres"
        name="firstName"
        value={valFirstName}
        onChange={handleInputChange}
        error={errFirstName}
      />
      <Input
        label="Apellidos"
        name="lastName"
        value={valLastName}
        onChange={handleInputChange}
        error={errLastName}
      />
      <Input
        label="Cédula de Indentidad"
        name="identification"
        value={valIdentification}
        onChange={handleInputChange}
        error={errIdentification}
      />
      <Input
        label="Número de teléfono"
        name="mobile"
        value={valMobile}
        onChange={handleInputChange}
        error={errMobile}
      />
      <Input
        label="2do Número de teléfono (Opcional)"
        name="secondMobile"
        value={valSecondMobile}
        onChange={handleInputChange}
      />
      <Input
        label="Email"
        name="email"
        value={valEmail}
        onChange={handleInputChange}
        error={errEmail}
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
  handleInputChange: PropTypes.string.isRequired,
  errFirstName: PropTypes.string.isRequired,
  errLastName: PropTypes.string.isRequired,
  errIdentification: PropTypes.string.isRequired,
  errMobile: PropTypes.string.isRequired,
  errEmail: PropTypes.string.isRequired,
};
