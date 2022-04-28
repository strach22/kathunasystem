import React from "react";
import { InputAdornment, OutlinedInput } from "@mui/material";
import PropTypes from "prop-types";

export default function InputValue(props) {
  const { name, error, value, onChange } = props;
  return (
    <OutlinedInput
      id="outlined-adornment-amount"
      name={name}
      value={value}
      onChange={onChange}
      startAdornment={<InputAdornment position="start">$</InputAdornment>}
      {...(error && { error: true, helperText: error })}
    />
  );
}

InputValue.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired,
};
