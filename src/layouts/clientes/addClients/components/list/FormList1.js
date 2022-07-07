import React from "react";
import PropTypes from "prop-types";
import Input from "elements/Input";

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
    errOther,
  } = props;

  return (
    <>
      <Input
        label="Nombres"
        name="firstName"
        value={valFirstName}
        onChange={handleInputChange}
        error={errFirstName}
        read=""
      />
      <Input
        label="Apellidos"
        name="lastName"
        value={valLastName}
        onChange={handleInputChange}
        error={errLastName}
        read=""
      />
      <Input
        label="Cédula de Indentidad"
        name="identification"
        value={valIdentification}
        onChange={handleInputChange}
        error={errIdentification}
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
        label="2do Número de teléfono (Opcional)"
        name="secondMobile"
        value={valSecondMobile}
        onChange={handleInputChange}
        error={errOther}
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
  errOther: PropTypes.string.isRequired,
};
