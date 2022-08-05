/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    // Label title
    "& .title": {
      color: "black",
      marginBottom: 30,
    },
    // Label
    "& .Subtitles": {
      color: "black",
      marginBottom: 10,
    },
    // Label
    "& .Subtitles2": {
      color: "gray",
      marginBottom: 10,
    },
    // Input
    "& .Input-outlined-allPages": {
      width: "100%",
      marginBottom: 25,
    },
    //  Label Input
    "& .MuiOutlinedInput-input": {
      fontSize: "110%",
    },
    // End Adornet Input Value
    "& .css-8l5fgy-MuiTypography-root": {
      fontSize: "130%",
    },
    // Buttons
    "& .OkBottom": {
      width: "100%",
      marginBottom: 10,
    },
    // Input Password
    "& .outlined-password-input": {
      width: "100%",
      marginBottom: 10,
    },
    // Label Input Password
    "& #outlined-password-input-label": {
      fontSize: "115%",
      color: "black",
    },
    // Buttons
    "& .BottomVerification": {
      width: "100%",
      background: "#357ABB",
      "&:hover": { background: "#5499C7" },
    },
    // Alert
    "& .MuiPaper-root": {
      width: "100%",
      borderRadius: 8,
      marginBottom: 30,
      marginTop: 15,
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
