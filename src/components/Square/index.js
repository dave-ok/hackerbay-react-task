import React from "react";
import PropTypes from "prop-types";
import "./square.css";
import mushroom from "./img/mushroom.png";
import mario from "./img/mario.jpg";

const Square = ({ piece }) => {
  let imgPath, imgAlt;
  if (piece === "mario") {
    imgPath = mario;
    imgAlt = "mario";
  } else if (piece === "mushroom") {
    imgPath = mushroom;
    imgAlt = "mushroom";
  }
  return (
    <div className="square">
      <div className="square-content">
        {piece && <img src={imgPath} alt={imgAlt} />}
      </div>
    </div>
  );
};

Square.propTypes = {
  piece: PropTypes.oneOf(["mario", "mushroom"]),
};

export default Square;
