import React, { useEffect, useRef, useState } from "react";
import { buildArray } from "../../utils/builder";
import Board from "../Board";
import "./game.css";

const Game = () => {
  const [numRows, setNumRows] = useState(0);
  const [numCols, setNumCols] = useState(0);
  const [boardArray, setBoardArray] = useState();
  const [mushrooms, setMushrooms] = useState(new Map());
  const [playerCol, setPlayerCol] = useState();
  const [playerRow, setPlayerRow] = useState();
  const [mushroomsCaptured, setMushroomsCaptured] = useState(0);
  const [moves, setMoves] = useState(0);
  const mushroomCount = useRef();
  const [gameOver, setGameOver] = useState(false);
  const [resetGame, setResetGame] = useState(false);

  const handleGameReset = () => {
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

    //place mario in middle
    setPlayerCol(Math.floor(cols / 2) - 1);
    setPlayerRow(Math.floor(rows / 2) - 1);

    // build board array
    const arr = buildArray(rows, cols);
    setBoardArray([...arr.boardArray]);
    setMushrooms(arr.mushroomMap);

    mushroomCount.current = arr.mushroomMap.size;
    setMoves(0);
    setMushroomsCaptured(0);
    setGameOver(false);
  };

  // initialize game
  useEffect(() => {
    handleGameReset();
  }, []);

  // reset game manually
  useEffect(() => {
    if (resetGame) {
      handleGameReset();
      setResetGame(false);
    }
  }, [resetGame]);

  // handle player moves
  useEffect(() => {
    const increaseMoves = () => setMoves((prevMoves) => prevMoves + 1);
    const handlePlayerMove = (evt) => {
      // stop player movement when game is over
      if (gameOver) return;
      switch (evt.key) {
        case "ArrowUp":
          if (playerRow > 0) {
            setPlayerRow(playerRow - 1);
            increaseMoves();
          }
          break;
        case "ArrowDown":
          if (playerRow < numRows - 1) {
            setPlayerRow(playerRow + 1);
            increaseMoves();
          }
          break;
        case "ArrowLeft":
          if (playerCol > 0) {
            setPlayerCol(playerCol - 1);
            increaseMoves();
          }
          break;
        case "ArrowRight":
          if (playerCol < numCols - 1) {
            setPlayerCol(playerCol + 1);
            increaseMoves();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handlePlayerMove);
    return () => {
      window.removeEventListener("keydown", handlePlayerMove);
    };
  }, [playerRow, playerCol, numRows, numCols, gameOver]);

  // track mushroom states
  useEffect(() => {
    const checkMushroomCaptured = (row, col) => {
      // if mushrooms exists at position
      const key = JSON.stringify({ row, col });
      if (mushrooms.has(key)) {
        if (mushrooms.get(key)["unCaptured"]) {
          setBoardArray((prevArray) => {
            const prevRows = prevArray.slice(0, row);
            const postRows = prevArray.slice(row + 1);

            // make copy
            const oldRow = [...prevArray[row]];
            oldRow.splice(col, 1, { unCaptured: false });

            const newArray = [...prevRows, [...oldRow], ...postRows];
            return newArray;
          });

          setMushrooms(new Map(mushrooms.set(key, false)));
          setMushroomsCaptured((prevState) => prevState + 1);
        }
      }
    };

    checkMushroomCaptured(playerRow, playerCol);
  }, [playerCol, playerRow, mushrooms]);

  // track game status
  useEffect(() => {
    if (mushroomsCaptured >= mushroomCount.current) {
      setGameOver(true);
      alert(`Congratulations you saved the princess in ${moves} moves.`);
    }
  }, [mushroomsCaptured, moves]);

  const onGameReset = () => {
    setResetGame(true);
  };

  return (
    <div className="game">
      {numRows && numCols ? (
        <div>
          <Board
            gameState={boardArray}
            playerCol={playerCol}
            playerRow={playerRow}
          />
          <div className="reset-button">
            <button onClick={onGameReset}>Reset</button>
          </div>
          <div className="stats-bar">
            <div>Moves: {moves}</div>
            <div>Captured: {mushroomsCaptured}</div>
            <div>Total: {mushroomCount.current}</div>
          </div>
        </div>
      ) : (
        "Loading ..."
      )}
    </div>
  );
};

export default Game;
