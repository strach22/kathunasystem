import React from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

export default function ButtonOk(props) {
  const { text, size, color, variant, onClick, ...other } = props;

  return (
    <Button
      variant={variant || "contained"}
      size={size || "large"}
      color={color || "primary"}
      onClick={onClick}
      {...other}
    >
      {text}
    </Button>
  );
}

ButtonOk.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  onClick: PropTypes.string.isRequired,
};
