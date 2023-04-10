import express from 'express';
import { createUserController, loginUserController } from './users.controller';

const routes = express.Router();

routes.post('/signup', createUserController);
routes.post('/login', loginUserController);

export { routes };
