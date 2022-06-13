import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const routes = nc({
  onError: (error, _req: NextApiRequest, res: NextApiResponse) => {
    console.error(error.message);

    return res.status(500).json({ error: 'Internal Server Error' });
  },
  onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
    return res.status(404).json({ error: 'API Not Found' });
  },
});

routes.get((req, res) => {
  const { board } = req.query as any;
  return res.json({ message: 'tic tac toe', board: board.split('') });
});

export default routes;
