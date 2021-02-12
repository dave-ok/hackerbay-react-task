const getRandomMushrooms = (rows, cols) => {
  const mushroomCount = Math.max(rows, cols);
  const mushrooms = new Set();

  while (mushrooms.size < mushroomCount) {
    mushrooms.add(
      JSON.stringify({
        col: Math.floor(Math.random() * cols),
        row: Math.floor(Math.random() * rows),
      })
    );
  }

  return mushrooms;
};

export const buildArray = (numRows, numCols) => {
  const mushroomSet = getRandomMushrooms(numRows, numCols);
  const boardArray = [];
  for (let row = 0; row < numRows; row++) {
    boardArray[row] = [];
    for (let col = 0; col < numCols; col++) {
      if (mushroomSet.has(JSON.stringify({ col, row }))) {
        boardArray[row][col] = { unCaptured: true };
      } else {
        boardArray[row][col] = null;
      }
    }
  }

  return boardArray;
};
