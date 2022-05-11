/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    // Label
    "& .Subtitles": {
      marginBottom: "25px",
      color: "black",
    },
    // Label
    "& .Subtitles2": {
      marginTop: "25px",
    },
    // NumericInput
    "& .MuiInputBase-adornedStart": {
      width: "100%",
      fontSize: "80%",
    },
    // NumericInput
    // "& .MuiInputBase-adornedEnd": {
    "& .InputTimeValue": {
      width: "90%",
      fontSize: "80%",
    },
    // Selector
    "& .MuiFormControl-fullWidth": {
      width: "50%",
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
    // // Buttons
    // "& .MuiButton-root": {
    //   width: "25%",
    //   color: "white",
    //   background: "#1A73E8",
    //   "&:hover": { background: "#5499C7" },
    //   margin: "50px 0px 50px 0px",
    // },
    // // Label
    // "& .SubtitlesInfo": {
    //   marginBottom: "20px",
    //   color: "black",
    // },
    // // Label
    // "& .SubtitlesValue": {
    //   color: "#959291",
    // },
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
