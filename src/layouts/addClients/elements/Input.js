import React from "react";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

export default function Input(props) {
  const { label, name, value, onChange } = props;

  return (
    <TextField variant="outlined" label={label} name={name} value={value} onChange={onChange} />
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired,
};
