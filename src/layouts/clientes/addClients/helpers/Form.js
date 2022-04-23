/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    // Todos los Inputs
    "& .MuiFormControl-root": {
      width: "90%",
      margin: "12px",
    },
    // ButtonGroup
    "& .ControlTariff": {
      margin: "10px 0px 25px 47px",
      paddingBottom: "10px",
      width: "70%",
      border: "1px double #CDD4D5",
      borderRadius: 7,
    },
    // ButtonGroup
    "& #demo-controlled-radio-buttons-group": {
      color: "grey",
      margin: "15px 0px 10px 15px",
    },
    // ButtonGroup
    "& .MuiRadio-root": {
      margin: "0px 10px 0px 40px",
    },
    // ButtonGroup
    "& .MuiTypography-root": {
      color: "#8C8F90",
      fontSize: "15px",
    },
    // ButtonGroup
    "& .MuiTouchRipple-root": {
      color: "black",
    },
    // Selector
    "& .MuiFormControl-fullWidth": {
      margin: "10px 0px 40px 47px",
      width: "70%",
    },
    // Selector
    "& #demo-simple-select": {
      height: 44,
      marginLeft: "8px",
    },
    // DatePicker
    "& .Calendario": {
      width: "70%",
      margin: "0px 0px 21px 47px",
    },
    // Buttons
    "& .MuiButton-root": {
      width: "15%",
      color: "black",
      margin: "100px 10px 0px 15px",
    },
    // Subtítulo
    "& .Subtitles": {
      fontSize: 20,
      color: "white",
      textAlign: "center",
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
