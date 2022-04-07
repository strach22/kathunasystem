import React from "react";
import { Button } from "@mui/material";
// import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";

// const useStyles = makeStyles({
//   root: {
//     margin: "30px 0px 0px 240px",
//     color: "black",
//   },
//   label: {
//     textTransform: "none",
//   },
// });

export default function ButtonOk(props) {
  const { text, size, color, variant, onClick, ...other } = props;
  // const classes = useStyles();

  return (
    <Button
      variant={variant || "contained"}
      size={size || "large"}
      // color={color || "success"}
      color={color || "primary"}
      onClick={onClick}
      {...other}
      // classes={{ root: classes.root, label: classes.label }}
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
