import { Request, Response } from 'express';

export const healthCheckController = (req: Request, res: Response) => {
  res.status(200).send('Super!');
};
