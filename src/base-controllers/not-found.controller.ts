import { Request, Response } from 'express';

export const notFoundController = (req: Request, res: Response) => {
  res.status(404).send('This Page Is Not Found');
};
