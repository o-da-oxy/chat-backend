import express from 'express';
import {
  createUserController,
  getAllUsersController,
  getUserByIdController,
  loginUserController,
  logoutUserController,
} from './users.controller';

const routes = express.Router();

routes.post('/signup', createUserController);
routes.post('/login', loginUserController);
routes.delete('/logout', logoutUserController);
routes.get('/all', getAllUsersController);
routes.get('/:id', getUserByIdController);

export { routes };
