/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    // Label
    "& .Subtitles": {
      marginBottom: "40px",
      color: "black",
    },
    // NumericInput
    "& .MuiInputBase-adornedStart": {
      width: "100%",
      fontSize: "90%",
      marginBottom: "25px",
    },
    // NumericInput
    "& .MuiInputBase-adornedEnd": {
      width: "100%",
      fontSize: "90%",
      marginBottom: "25px",
    },
    // Selector
    "& .MuiFormControl-fullWidth": {
      width: "100%",
    },
    // Label Selector
    "& .css-56s1s1-MuiInputBase-root-MuiOutlinedInput-root": {
      fontSize: "100%",
      color: "black",
    },
    // Small Label Selector
    "& .MuiInputLabel-root": {
      fontSize: "100%",
    },
    // Selector
    "& #demo-simple-select": {
      width: "100%",
      height: 50,
      marginLeft: "10px",
    },
    // Label
    "& .SubtitlesInfo": {
      margin: "0px 0px 0px 40px",
      color: "black",
    },
    // Label
    "& .SubtitlesValue": {
      margin: "0px 0px 30px 120px",
      color: "grey",
    },
    // Buttons
    "& .MuiButton-root": {
      width: "50%",
      color: "white",
      background: "#1A73E8",
      "&:hover": { background: "#5499C7" },
    },
    // "& #textAreaForm": {
    //   width: "90%",
    //   height: "35%",
    //   padding: "2%",
    //   border: "1px double #CDD4D5",
    //   borderRadius: 7,
    //   fontSize: "80%",
    // },
    // // Alert
    // "& .MuiPaper-root": {
    //   width: "80%",
    //   marginBottom: "40px",
    //   borderRadius: 8,
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
