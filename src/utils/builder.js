const getRandomMushrooms = (rows, cols) => {
  const mushroomCount = Math.max(rows, cols);
  const mushrooms = new Map();

  while (mushrooms.size < mushroomCount) {
    const colCenter = Math.floor(cols / 2) - 1;
    const rowCenter = Math.floor(rows / 2) - 1;

    const col = Math.floor(Math.random() * cols);
    const row = Math.floor(Math.random() * rows);

    // avoid center for mario
    if (col === colCenter && row === rowCenter) continue;

    mushrooms.set(
      JSON.stringify({
        row,
        col,
      }),
      { unCaptured: true }
    );
  }

  return mushrooms;
};

export const buildArray = (numRows, numCols) => {
  const mushroomMap = getRandomMushrooms(numRows, numCols);
  const boardArray = [];
  for (let row = 0; row < numRows; row++) {
    boardArray[row] = [];
    for (let col = 0; col < numCols; col++) {
      if (mushroomMap.has(JSON.stringify({ row, col }))) {
        boardArray[row][col] = { unCaptured: true };
      } else {
        boardArray[row][col] = null;
      }
    }
  }

  return { boardArray, mushroomMap };
};
