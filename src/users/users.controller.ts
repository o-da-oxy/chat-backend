import { NextFunction, Request, Response } from 'express';

export async function getAllUsersController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // таким образом достаем db в любом месте из контекста
    const { db } = req.context;
    res.json(await db.user.findMany(req.body));
  } catch (err) {
    next(err);
  }
}

export async function getUserByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { db } = req.context;
    res.json(await db.user.findFirst(req.body));
  } catch (err) {
    next(err);
  }
}

export async function createUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { db } = req.context;

    res.json(
      await db.user.create({
        data: req.body,
      })
    );
  } catch (err: any) {
    let msg;
    if (err.code === 11000) {
      msg = 'User already exists';
    } else {
      msg = err.message;
    }
    console.log(err);
    res.status(400).json(msg);
  }
}

export async function loginUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { db } = req.context;
    const user = await db.user.findFirst({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    });
    if (user) {
      user.status = 'online';
      res.status(200).json(user);
    } else {
      throw Error;
    }
  } catch (err: any) {
    res.status(400).json(err.message);
  }
}
