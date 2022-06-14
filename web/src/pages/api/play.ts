import type { NextApiRequest, NextApiResponse } from 'next';
import nc, { NextHandler } from 'next-connect';
import { NextApiRequestExtendT } from '@/generated/Play';
import { checkForWinner, selectBox } from '@/utils/GameHelper';

const routes = nc({
  onError: (error, _req: NextApiRequest, res: NextApiResponse) => {
    console.error(error.message);

    return res.status(500).json({ error: 'Internal Server Error' });
  },
  onNoMatch: (_req: NextApiRequest, res: NextApiResponse) => {
    return res.status(404).json({ error: 'API Not Found' });
  },
});

const validateBoardMiddleware = (
  req: NextApiRequestExtendT,
  res: NextApiResponse,
  next: NextHandler
) => {
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

routes.use(validateBoardMiddleware).get((req: NextApiRequestExtendT, res) => {
  const board = req.board as string[];

  const winner = checkForWinner(board);
  // check for winner
  if (winner) {
    return res.json({ board: board.join(''), winner });
  }

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
  }
  return res.json({ board: board.join(''), tie: true });
});

export default routes;
