import type { NextApiRequest, NextApiResponse } from 'next';
import nc, { NextHandler } from 'next-connect';
import { NextApiRequestExtendT } from '@/generated/Play';

const routes = nc({
  onError: (error, _req: NextApiRequest, res: NextApiResponse) => {
    console.error(error.message);

    return res.status(500).json({ error: 'Internal Server Error' });
  },
  onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
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

routes.use(validateBoard).get((req: NextApiRequestExtendT, res) => {
  console.log(req.board);
  return res.json({ message: 'tic tac toe', board: req.board });
});

export default routes;
