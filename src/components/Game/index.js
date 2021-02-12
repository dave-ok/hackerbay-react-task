import React, { useEffect, useState } from "react";
import { buildArray } from "../../utils/builder";
import Board from "../Board";

const Game = () => {
  const tempArray = [
    [{ unCaptured: true }, null, null],
    [null, null, { unCaptured: true }],
    [null, { unCaptured: true }, null],
  ];

  const [numRows, setNumRows] = useState(0);
  const [numCols, setNumCols] = useState(0);
  const [boardArray, setBoardArray] = useState([]);

  useEffect(() => {
    // prompt for columns and rows
    let rowsEntered = false;
    let rows, cols;
    while (!rowsEntered) {
      try {
        rows = parseInt(
          prompt(
            "Specify the number of rows on the game board (default = 8)",
            "8"
          ),
          10
        );

        if (Number.isNaN(rows)) throw new Error();

        setNumRows(rows);
        rowsEntered = true;
      } catch (error) {
        alert("Invalid number specified");
      }
    }

    let colsEntered = false;
    while (!colsEntered) {
      try {
        cols = parseInt(
          prompt(
            "Specify the number of columns on the game board (default = 8)",
            "8"
          ),
          10
        );

        if (Number.isNaN(cols)) throw new Error();

        setNumCols(cols);
        colsEntered = true;
      } catch (error) {
        alert("Invalid number specified");
      }
    }

    // build board array
    const arr = buildArray(rows, cols);
    setBoardArray(arr);
  }, []);

  return (
    <div>
      {numRows && numCols ? (
        <Board gameState={boardArray} playerCol={0} playerRow={0} />
      ) : (
        "Loading ..."
      )}
    </div>
  );
};

export default Game;
