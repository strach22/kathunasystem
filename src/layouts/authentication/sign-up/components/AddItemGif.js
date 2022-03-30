import React from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line import/prefer-default-export
export function AddItemGif({ title, url }) {
  return (
    <div className="card animate__animated animate__lightSpeedInRight">
      <img src={url} alt={title} />
      <p>{title}</p>
    </div>
  );
}

AddItemGif.propTypes = {
  title: PropTypes.func.isRequired,
  url: PropTypes.func.isRequired,
};
