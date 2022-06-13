import type { NextApiRequest } from 'next';

export interface NextApiRequestExtendT extends NextApiRequest{
    board?: string[]
}