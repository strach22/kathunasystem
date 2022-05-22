import React from "react";
import { FormControl, FormHelperText, InputAdornment, OutlinedInput } from "@mui/material";
import PropTypes from "prop-types";
import MDTypography from "components/MDTypography";

export default function InputValue(props) {
  const { className, name, value, onChange, error, icon, position, read } = props;
  return (
    <FormControl>
      <OutlinedInput
        id="outlined-adornment-amount"
        type="number"
        className={className}
        name={name}
        value={value}
        onChange={onChange}
        {...(error && { error: true })}
        {...(read === "true" && { readOnly: true })}
        startAdornment={
          position === "start" && <InputAdornment position={position}>{icon}</InputAdornment>
        }
        endAdornment={
          position === "end" && (
            <InputAdornment position={position}>
              <MDTypography
                color="inherit"
                fontWeight="regular"
                variant="h6"
                sx={{ fontSize: "90%" }}
              >
                {icon}
              </MDTypography>
            </InputAdornment>
          )
        }
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
}

InputValue.propTypes = {
  className: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  read: PropTypes.string.isRequired,
};
