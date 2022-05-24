/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    // Label title
    "& .title": {
      color: "black",
      marginBottom: "30px",
    },
    // Label title
    "& .title2": {
      color: "black",
      marginBottom: "30px",
      marginTop: "40px",
    },
    // Label
    "& .Subtitles": {
      color: "black",
    },
    // Label
    "& .Subtitles2": {
      color: "gray",
    },
    // Input
    "& .Input-outlined-allPages": {
      width: "90%",
      marginBottom: "30px",
    },
    //  Label Input
    "& .MuiOutlinedInput-input": {
      fontSize: "130%",
    },
    //  Input Value
    "& .InputInterest": {
      width: "50%",
    },
    // End Adornet Input Value
    "& .css-8l5fgy-MuiTypography-root": {
      fontSize: "130%",
    },
    // Buttons
    "& .OkBottom": {
      width: "80%",
      marginTop: "30px",
    },
    // Input Password
    "& .outlined-password-input": {
      width: "85%",
    },
    // Label Input Password
    "& #outlined-password-input-label": {
      fontSize: "115%",
      color: "black",
    },
    // Buttons
    "& .BottomVerification": {
      width: "50%",
      background: "#357ABB",
      "&:hover": { background: "#5499C7" },
    },
    // Alert
    "& .MuiPaper-root": {
      width: "100%",
      marginTop: "30px",
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
