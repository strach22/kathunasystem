import React from "react";
import { FormControl, FormHelperText, InputAdornment, OutlinedInput } from "@mui/material";
import PropTypes from "prop-types";

export default function InputValue(props) {
  const { name, value, onChange, error, icon, position } = props;
  return (
    <FormControl>
      <OutlinedInput
        id="outlined-adornment-amount"
        name={name}
        value={value}
        onChange={onChange}
        {...(error && { error: true })}
        startAdornment={
          position === "start" && <InputAdornment position={position}>{icon}</InputAdornment>
        }
        endAdornment={
          position === "end" && (
            <InputAdornment position={position} sx={{ fontWeight: "bold" }}>
              {icon}
            </InputAdornment>
          )
        }
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
}

InputValue.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
};
