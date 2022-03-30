import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { AddCategory } from "./components/AddCategory";
import { AddGif } from "./components/AddGif";
import "./indexSingUp.css";

function Cover() {
  const [categories, setCategories] = useState(["Marvel", "DC", "Anime"]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <h2>LISTADO DE GIFS</h2>
      <AddCategory setCategories={setCategories} />
      <hr />
      <ol>
        {categories.map((category) => (
          <AddGif key={category} category={category} />
        ))}
      </ol>
    </DashboardLayout>
  );
}

export default Cover;
