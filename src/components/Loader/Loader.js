import React from "react";
import loader from "../../Gifs/loader.gif";
import "./Loader.scss"

export default function Loader() {
  return (
    <div className="loader-container">
      <img src={loader} alt="Loader" />
    </div>
  );
}
