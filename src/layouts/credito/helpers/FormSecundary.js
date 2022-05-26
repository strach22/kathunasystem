/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    // Label
    "& .Subtitles": {
      marginBottom: "15px",
      color: "black",
    },
    // DatePicker
    "& .Calendario": {
      width: "60%",
      marginBottom: "40px",
    },
    // Selector
    "& .MuiFormControl-fullWidth": {
      width: "80%",
    },
    // Label Selector
    "& .css-56s1s1-MuiInputBase-root-MuiOutlinedInput-root": {
      fontSize: "80%",
      color: "black",
    },
    // Selector
    "& #demo-simple-select": {
      width: "100%",
      height: 46,
      marginLeft: "10px",
    },
    // NumericInput
    "& .MuiInputBase-adornedStart": {
      width: "75%",
      height: 55,
      fontSize: "120%",
    },
    "& #textAreaForm": {
      width: "80%",
      height: "35%",
      padding: "2%",
      border: "1px double #CDD4D5",
      borderRadius: 7,
      fontSize: "80%",
    },
    // Buttons
    "& .MuiButton-root": {
      width: "20%",
      color: "white",
      margin: "50px 10px 0px 15px",
    },
  },
});

export default function FormSecundary(props) {
  const classes = useStyles();

  const { children, ...other } = props;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <form className={classes.root} autoComplete="off" {...other}>
      {props.children}
    </form>
  );
}
