/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    // Label
    "& .Subtitles": {
      color: "black",
    },
    // Input
    "& .Input-outlined-allPages": {
      width: "90%",
      marginLeft: "20px",
    },
    //  Label Input
    "& .MuiOutlinedInput-input": {
      fontSize: "120%",
    },
    // Buttons
    "& .OkBottom": {
      width: "80%",
      marginLeft: "40px",
    },
    // Input Password
    "& .outlined-password-input": {
      width: "100%",
      marginTop: "30px",
    },
    // Label Input Password
    "& #outlined-password-input-label": {
      fontSize: "115%",
    },
    // Buttons
    "& .BottomVerification": {
      width: "20%",
      margin: "30px 0px 0px 70px",
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
