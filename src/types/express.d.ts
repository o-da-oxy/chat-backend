import { prisma } from '../db';

// to make the file a module and avoid the TypeScript error
export {};

// расширяем тип express: добавляем туда контекст и бд
declare global {
  namespace Express {
    export interface Request {
      context: {
        db: typeof prisma;
      };
    }
  }
}
