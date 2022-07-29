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
      width: "100%",
      color: "white",
      margin: "50px 10px 0px 15px",
    },
    // Subtítulo
    "& .Subtitles": {
      // fontSize: 20,
      // color: "white",
      // textAlign: "center",
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
