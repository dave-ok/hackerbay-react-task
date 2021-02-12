import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Square from "../Square";

const Board = ({ gameState, playerRow, playerCol }) => {
  const [pieces, setPieces] = useState([]);
  const initialGameState = useRef(gameState);
  useEffect(() => {
    // initialize the gameState
    setPieces(initialGameState.current);
  }, []);

  return (
    <div>
      {pieces.length &&
        pieces.map((row, rowIndex) => {
          return (
            <div
              className="row"
              key={`row-${rowIndex}`}
              style={{ display: "flex" }}
            >
              {row.map((elem, colIndex) => {
                // determine type of element to render in square
                let piece;

                // if the current position is the player position (takes precedence)
                if (playerRow === rowIndex && playerCol === colIndex) {
                  piece = "mario";
                } else if (elem && elem.unCaptured) {
                  // mushroom object - only show when un-captured
                  piece = "mushroom";
                }

                return (
                  <div key={`row-${rowIndex}-col-${colIndex}`}>
                    <Square piece={piece} />
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

Board.propTypes = {
  boardArray: PropTypes.array,
};

export default Board;
