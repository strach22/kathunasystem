import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

export default function SelectG(props) {
  const { name, label, value, error = null, onChange, options } = props;

  return (
    <FormControl fullWidth>
      <InputLabel {...(error && { error: true })} id="demo-simple-select-label">
        {label}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        {...(error && { error: true })}
      >
        {options.map((item) => (
          <MenuItem key={item.id} value={item.title}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
}

SelectG.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired,
  options: PropTypes.string.isRequired,
};
