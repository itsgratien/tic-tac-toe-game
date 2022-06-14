import type { NextApiRequest, NextApiResponse } from 'next';
import nc, { NextHandler } from 'next-connect';
import { NextApiRequestExtendT } from '@/generated/Play';

const routes = nc({
  onError: (error, _req: NextApiRequest, res: NextApiResponse) => {
    console.error(error.message);

    return res.status(500).json({ error: 'Internal Server Error' });
  },
  onNoMatch: (_req: NextApiRequest, res: NextApiResponse) => {
    return res.status(404).json({ error: 'API Not Found' });
  },
});

const validateBoard = (req: NextApiRequestExtendT, res: NextApiResponse, next: NextHandler) => {
  const { board } = req.query as any;

  const splitBoard = board.split('') as string[];

  const player = 'x';

  const computer = 'o';

  if (splitBoard.length !== 9) {
    return res.status(400).json({ error: 'Board should be nine (9) characters' });
  }

  const check = splitBoard.filter((item) => item !== player && item !== computer && item !== ' ');

  if (check.length > 0) {
    return res.status(400).json({ error: 'Invalid characters' });
  }

  req.board = splitBoard;
  next();
};

const selectBox = (emptyBoxes: any) => {
  const boxTotatIndex = emptyBoxes.length - 1;

  const random = (Math.random() * boxTotatIndex).toFixed();

  const getRandomSelectedBox = emptyBoxes[Number(random)];

  return getRandomSelectedBox;
};

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkForWinner = (board: string[]) => {
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

routes.use(validateBoard).get((req: NextApiRequestExtendT, res) => {
  const board = req.board as string[];

  const winner = checkForWinner(board);
  // check for winner
  if (winner) {
    return res.json({ board: board.join(''), winner });
  } else {
    // get empty boxes
    const emptyBoxes = [];

    for (let i = 0; i < board.length; i++) {
      if (board[i] === ' ') {
        emptyBoxes.push({ item: board[i], index: i });
      }
    }

    if (emptyBoxes.length > 0) {
      // computer: select one box from those empty boxes
      const selectedBox = selectBox(emptyBoxes);

      const newBoard = board
        .map((item, itemKey) => {
          if (itemKey === selectedBox.index) {
            item = 'o';
          }
          return item;
        })
        .join('');

      return res.json({ board: newBoard, checkedEmpty: true });
    } else {
      return res.json({ board: board.join(''), tie: true });
    }
  }
});

export default routes;
