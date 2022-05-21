import React from "react";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

export default function Input(props) {
  const { label, name, error, value, onChange } = props;

  return (
    <TextField
      id="outlined-password-input"
      variant="outlined"
      type="password"
      autoComplete="current-password"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
    />
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
