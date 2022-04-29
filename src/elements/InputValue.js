/* eslint-disable react/prop-types */
import React from "react";
import { FormControl, FormHelperText, InputAdornment, OutlinedInput } from "@mui/material";
// import PropTypes from "prop-types";

export default function InputValue(props) {
  const { name, value, onChange, error } = props;

  return (
    <FormControl>
      <OutlinedInput
        id="outlined-adornment-amount"
        name={name}
        value={value}
        onChange={onChange}
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        {...(error && { error: true })}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
}

// InputValue.propTypes = {
//   name: PropTypes.string.isRequired,
//   value: PropTypes.string.isRequired,
//   onChange: PropTypes.string.isRequired,
// };
