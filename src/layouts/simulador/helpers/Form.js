/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    // Label
    "& .Subtitles": {
      marginBottom: "30px",
      color: "black",
    },
    // NumericInput
    "& .MuiInputBase-adornedStart": {
      width: "100%",
      fontSize: "80%",
      marginBottom: "40px",
    },
    // NumericInput
    "& .MuiInputBase-adornedEnd": {
      width: "90%",
      fontSize: "80%",
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
      width: "100%",
      height: 46,
      marginLeft: "10px",
    },
    // Buttons
    "& .MuiButton-root": {
      width: "25%",
      color: "white",
      background: "#1A73E8",
      "&:hover": { background: "#5499C7" },
      marginBottom: "50px",
    },
    // Label
    "& .SubtitlesInfo": {
      marginBottom: "20px",
      color: "black",
    },
    // Label
    "& .SubtitlesValue": {
      color: "grey",
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
