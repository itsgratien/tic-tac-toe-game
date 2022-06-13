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

routes.use(validateBoard).get((req: NextApiRequestExtendT, res) => {
  const emptyBoxes = [];

  const board = req.board as string[];

  // get empty boxes
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

    return res.json({ board: newBoard });
  } else {
    // find the winner or tie
    return res.json({ message: 'tic tac toe', board: req.board });
  }
});

export default routes;
