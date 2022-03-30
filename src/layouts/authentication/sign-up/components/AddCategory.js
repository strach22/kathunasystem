import React, { useState } from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line import/prefer-default-export
export function AddCategory({ setCategories }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim().length > 2) {
      setCategories((categ) => [inputValue, ...categ]);
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={inputValue} onChange={handleInputChange} />
    </form>
  );
}

AddCategory.propTypes = {
  setCategories: PropTypes.func.isRequired,
};
