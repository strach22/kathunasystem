/* eslint-disable react/prop-types */
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TextField } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

export default function DatePickerH(props) {
  const { name, label, value, onChange } = props;

  // eslint-disable-next-line no-shadow
  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  // console.log(Date.parse(value));

  // const auxDate = new Date().toISOString().split("T")[0];
  // new Date(value).toISOString().split("T")[0]);

  // // const auxDate = Date(value);
  // console.log(auxDate);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        // maxDate="+2m"
        label={label}
        inputFormat="dd/MM/yyyy"
        name={name}
        value={value}
        onChange={(date) => onChange(convertToDefEventPara(name, date))}
        renderInput={(params) => <TextField {...params} className="Calendario" />}
      />
    </LocalizationProvider>
  );
}

DatePickerH.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired,
};
