import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.json({
    code: [err.code],
    message: [err.message],
  });
};
