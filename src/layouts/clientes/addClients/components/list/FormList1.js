import React from "react";
import PropTypes from "prop-types";
import Input from "elements/Input";
import SelectG from "elements/SelectG";
import * as ConstDate from "elements/data/ConstDate";

export default function FormList1(props) {
  const {
    valFirstName,
    valIdentification,
    valSecondMobile,
    valAddress,
    valTariff,
    handleInputChange,
    errFirstName,
    errIdentification,
    errAddress,
    errTariff,
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
        label="Cédula de Indentidad"
        name="identification"
        value={valIdentification}
        onChange={handleInputChange}
        error={errIdentification}
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
        label="Dirección"
        name="address"
        value={valAddress}
        onChange={handleInputChange}
        error={errAddress}
        read=""
      />
      <SelectG
        name="tariff"
        label="Tarifa"
        value={valTariff}
        onChange={handleInputChange}
        options={ConstDate.getTariffItems()}
        error={errTariff}
      />
    </>
  );
}

FormList1.propTypes = {
  valFirstName: PropTypes.string.isRequired,
  valIdentification: PropTypes.string.isRequired,
  valSecondMobile: PropTypes.string.isRequired,
  valAddress: PropTypes.string.isRequired,
  valTariff: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  errFirstName: PropTypes.string.isRequired,
  errIdentification: PropTypes.string.isRequired,
  errAddress: PropTypes.string.isRequired,
  errTariff: PropTypes.string.isRequired,
  errOther: PropTypes.string.isRequired,
};
