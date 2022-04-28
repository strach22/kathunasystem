import React from "react";
import { TextareaAutosize } from "@mui/material";
import PropTypes from "prop-types";

export default function TextArea(props) {
  const { minRows, maxRows, placeholder } = props;
  return (
    <TextareaAutosize
      id="textAreaForm"
      aria-label="minimum height"
      minRows={minRows}
      maxRows={maxRows}
      placeholder={placeholder}
    />
  );
}

TextArea.propTypes = {
  minRows: PropTypes.string.isRequired,
  maxRows: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};
