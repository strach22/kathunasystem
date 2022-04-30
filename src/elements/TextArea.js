/* eslint-disable react/prop-types */
import React from "react";
import { TextareaAutosize } from "@mui/material";
// import PropTypes from "prop-types";

export default function TextArea(props) {
  const { name, minRows, maxRows, value, onChange, placeholder } = props;
  return (
    <TextareaAutosize
      id="textAreaForm"
      aria-label="minimum height"
      name={name}
      minRows={minRows}
      maxRows={maxRows}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

// TextArea.propTypes = {
//   minRows: PropTypes.string.isRequired,
//   maxRows: PropTypes.string.isRequired,
//   placeholder: PropTypes.string.isRequired,
// };
