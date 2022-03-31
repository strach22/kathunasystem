import React from "react";
import { TextField } from "@mui/material";

export default function Input(props) {
  // eslint-disable-next-line react/prop-types
  const { label, name, value, onChange } = props;

  return (
    <TextField variant="outlined" label={label} name={name} value={value} onChange={onChange} />
  );
}
