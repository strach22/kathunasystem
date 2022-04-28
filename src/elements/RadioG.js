import React from "react";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "#F3F7F9",
    },
  },
});

export default function RadioG(props) {
  const classes = useStyles();
  const { name, label, value, onChange, items } = props;

  return (
    <FormControl className="ControlTariff">
      <FormLabel id="demo-controlled-radio-buttons-group">{label}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name={name}
        value={value}
        onChange={onChange}
      >
        {items.map((item) => (
          <FormControlLabel
            key={item.id}
            value={item.id}
            control={<Radio className={classes.root} />}
            label={item.title}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

RadioG.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  items: PropTypes.string.isRequired,
};
