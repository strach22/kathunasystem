/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    // Todos los Inputs
    "& .MuiFormControl-root": {
      width: "90%",
      margin: 12,
    },
    // Selector
    "& #demo-simple-select": {
      height: 44,
      marginLeft: 10,
    },
    // Buttons
    "& .MuiButton-root": {
      width: "90%",
      color: "white",
      margin: "0px 30px 10px 30px",
    },
    // Card
    "& .MuiPaper-root": {
      marginBottom: 70,
    },
  },
});

export default function Form(props) {
  const classes = useStyles();

  const { children, ...other } = props;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <form className={classes.root} autoComplete="off" {...other}>
      {props.children}
    </form>
  );
}
