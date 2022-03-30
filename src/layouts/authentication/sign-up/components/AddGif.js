import React from "react";
import PropTypes from "prop-types";
import { useFetchGifs } from "../hooks/useFetchGifs";
import { AddItemGif } from "./AddItemGif";

// eslint-disable-next-line import/prefer-default-export
export function AddGif({ category }) {
  const { data: images, loading } = useFetchGifs(category);

  return (
    <>
      <h3 className="animate__animated animate__swing">{category}</h3>
      {loading && <p className="animate__animated animate__fadeInTopRight">Loading...</p>}
      <div className="card-grid">
        {images.map((img) => (
          <AddItemGif key={img.id} {...img} />
        ))}
      </div>
    </>
  );
}

AddGif.propTypes = {
  category: PropTypes.func.isRequired,
};
