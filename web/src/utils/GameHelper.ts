export const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const checkForWinner = (board: string[]) => {
  let winner;
  for (let i = 0; i < winningCombinations.length; i++) {
    const checkForWinnerX = winningCombinations[i].every((item) => board[item] === 'x');

    if (checkForWinnerX) {
      winner = 'x';
    }

    const checkWinnerComputer = winningCombinations[i].every((item) => board[item] === 'o');

    if (checkWinnerComputer) {
      winner = 'o';
    }
  }

  return winner;
};

export const selectBox = (emptyBoxes: any) => {
  const boxTotatIndex = emptyBoxes.length - 1;

  const random = (Math.random() * boxTotatIndex).toFixed();

  const getRandomSelectedBox = emptyBoxes[Number(random)];

  return getRandomSelectedBox;
};
