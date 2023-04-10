import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

// каждый раз не импортировать prisma client и иметь доступ к бд
const prisma = new PrismaClient();

// расширяем запрос доступом к бд, чтобы каждый раз не import prisma client
const extendContextWithDb = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.context = req.context || {}; //проверка, если в реквест положили другое
  req.context.db = prisma; // types/express.d.ts
  // можем положить какие угодно коннекшоны (к рассылке, очередям и тд)

  next();
};
export { prisma, extendContextWithDb };
