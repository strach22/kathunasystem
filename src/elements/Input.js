import React from "react";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

export default function Input(props) {
  const { label, name, error, value, onChange, state, read } = props;

  return (
    <TextField
      {...(state === "false" && { disabled: true })}
      {...(read === "true" && { InputProps: { readOnly: true } })}
      className="Input-outlined-allPages"
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
      {...(state === "false" && { error: false, helperText: "" })}
    />
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  state: PropTypes.string.isRequired,
  read: PropTypes.string.isRequired,
};
