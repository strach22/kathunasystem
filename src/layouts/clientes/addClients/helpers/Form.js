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
    // DatePicker
    "& .MuiBox-root": {
      width: "77.5%",
      margin: "20px 0px 0px 40px",
    },
    // Selector
    "& .MuiFormControl-fullWidth": {
      margin: "20px 0px 0px 50px",
      width: "70%",
    },
    // Selector
    "& #demo-simple-select": {
      height: 44,
      marginLeft: "8px",
    },
    // ButtonGroup
    "& .ControlTariff": {
      margin: "16px 0px 0px 50px",
      paddingBottom: "1px",
      width: "70%",
      border: "1px double #CDD4D5",
      borderRadius: 7,
    },
    // ButtonGroup
    "& #demo-controlled-radio-buttons-group": {
      color: "grey",
      margin: "10px 0px 5px 15px",
    },
    // ButtonGroup
    "& .MuiRadio-root": {
      margin: "0px 10px 0px 40px",
    },
    // ButtonGroup
    "& .MuiTypography-root": {
      color: "grey",
    },
    // CheckBox
    "& .checkOption": {
      margin: "10px 0px 0px 40px",
      width: "77%",
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
