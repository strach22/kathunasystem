import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

export default function SelectG(props) {
  const { name, label, value, onChange, options } = props;

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label" sx={{ marginLeft: "60px" }}>
        {label}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        sx={{ height: 44, width: 300, margin: "0px 0px 10px 60px" }}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

SelectG.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired,
  options: PropTypes.string.isRequired,
};
