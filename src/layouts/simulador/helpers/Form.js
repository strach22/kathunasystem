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
    // NumericInput
    "& .MuiInputBase-adornedStart": {
      width: "100%",
      fontSize: "90%",
    },
    // NumericInput
    "& .MuiInputBase-adornedEnd": {
      width: "90%",
      fontSize: "90%",
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
    // Small Label Selector
    "& .MuiInputLabel-root": {
      fontSize: "90%",
    },
    // Selector
    "& #demo-simple-select": {
      height: 46,
      marginLeft: "10px",
    },
    // Buttons
    "& .MuiButton-root": {
      width: "100%",
      marginTop: 10,
    },
    // Label
    "& .SubtitlesInfo": {
      color: "black",
    },
    // Label
    "& .SubtitlesValue": {
      color: "#959291",
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
