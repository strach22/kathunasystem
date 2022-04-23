/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    // DatePicker
    "& .Calendario": {
      width: "50%",
      marginBottom: "40px",
    },
    // NumericInput
    "& .MuiInputBase-adornedStart": {
      width: "70%",
      height: "35%",
      marginBottom: "100px",
      fontSize: "120%",
    },
    // Label
    "& .Subtitles": {
      marginBottom: "15px",
      color: "black",
      // fontFamily: "cursive",
    },
    // Buttons
    "& .MuiButton-root": {
      width: "15%",
      color: "black",
      margin: "0px 10px 0px 15px",
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
