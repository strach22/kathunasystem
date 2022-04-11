import React from "react";
import PropTypes from "prop-types";
import Input from "../Input";
import RadioG from "../RadioG";
import SelectG from "../SelectG";
import DatePickerH from "../DatePickerH";
import * as ConstDate from "../../helpers/ConstDate";

export default function FormList2(props) {
  const { valTariff, valCivil, valBirthDate, valAddress, handleInputChange, errCivil, errAddress } =
    props;

  return (
    <>
      <RadioG
        name="tariff"
        label="Tarifa"
        value={valTariff}
        onChange={handleInputChange}
        items={ConstDate.tariffItems()}
      />
      <SelectG
        name="civil"
        label="Estado Civil"
        value={valCivil}
        onChange={handleInputChange}
        options={ConstDate.getCivilStatus()}
        error={errCivil}
      />
      <DatePickerH
        name="birthDate"
        label="Fecha de Nacimiento"
        value={valBirthDate}
        onChange={handleInputChange}
      />
      <Input
        label="Dirección"
        name="address"
        value={valAddress}
        onChange={handleInputChange}
        error={errAddress}
      />
    </>
  );
}

FormList2.propTypes = {
  valTariff: PropTypes.string.isRequired,
  valCivil: PropTypes.string.isRequired,
  valBirthDate: PropTypes.string.isRequired,
  valAddress: PropTypes.string.isRequired,
  handleInputChange: PropTypes.string.isRequired,
  errCivil: PropTypes.string.isRequired,
  errAddress: PropTypes.string.isRequired,
};
