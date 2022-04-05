import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import PropTypes from "prop-types";

export default function RadioG(props) {
  const { name, label, value, onChange, items, error } = props;

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group" color="grey" sx={{ marginLeft: "60px" }}>
        {label}
      </FormLabel>
      <RadioGroup
        sx={{
          fontSize: 23,
          border: "1px double #CDD4D5",
          paddingLeft: 3,
          width: 300,
          borderRadius: 2,
          margin: "5px 0px 15px 60px",
        }}
        aria-labelledby="demo-controlled-radio-buttons-group"
        name={name}
        value={value}
        onChange={onChange}
      >
        {items.map((item) => (
          <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.title} />
        ))}
      </RadioGroup>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}

RadioG.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired,
  items: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
};
