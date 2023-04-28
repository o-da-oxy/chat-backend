import express from 'express';
import {
  getRoomNamesController,
  getRoomsRolesController,
  getRoomsDescriptionsController,
} from './rooms.controller';

const routes = express.Router();

routes.use('/names', getRoomNamesController);
routes.use('/roles', getRoomsRolesController);
routes.use('/descriptions', getRoomsDescriptionsController);

export { routes };
