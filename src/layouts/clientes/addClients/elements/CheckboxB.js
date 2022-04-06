import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

export default function CheckboxB(props) {
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
        className="checkOption"
        control={
          <Checkbox
            sx={{ marginLeft: "60px" }}
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

CheckboxB.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired,
};
