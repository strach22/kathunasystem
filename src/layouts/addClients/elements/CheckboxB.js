import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import React from "react";

export default function CheckboxB(props) {
  // eslint-disable-next-line react/prop-types
  const { name, label, value, onChange } = props;

  // eslint-disable-next-line no-shadow
  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <FormControl>
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            color="primary"
            checked={value}
            onChange={(e) => onChange(convertToDefEventPara(name, e.target.checked))}
          />
        }
        label={label}
      />
    </FormControl>
  );
}
