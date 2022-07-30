/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    // Label
    "& .Subtitles": {
      marginBottom: "15px",
      marginTop: "40px",
      color: "black",
    },
    // DatePicker
    "& .Calendario": {
      width: "100%",
    },
    // Selector
    "& .MuiFormControl-fullWidth": {
      width: "100%",
    },
    // Label Selector
    "& .css-56s1s1-MuiInputBase-root-MuiOutlinedInput-root": {
      fontSize: "80%",
      color: "black",
    },
    // Selector
    "& #demo-simple-select": {
      height: 46,
      marginLeft: "10px",
    },
    // NumericInput
    "& .MuiInputBase-adornedStart": {
      width: "100%",
      fontSize: "100%",
    },
    // Text Area
    "& #textAreaForm": {
      width: "100%",
      height: "35%",
      padding: "2%",
      border: "1px double #CDD4D5",
      borderRadius: 7,
      fontSize: "80%",
      marginBottom: 50,
    },
    // Buttons
    "& .MuiButton-root": {
      width: "100%",
      marginBottom: 10,
    },
    // Alert
    "& .MuiPaper-root": {
      width: "100%",
      marginTop: "25px",
      borderRadius: 8,
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
