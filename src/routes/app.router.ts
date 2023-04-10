import express from 'express';
import { healthCheckController } from '../base-controllers/health-check.controller';
import { notFoundController } from '../base-controllers/not-found.controller';
import { errorHandler } from '../errors/error.handler';
import { routes as userRoutes } from '../users/users.router';

const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/health', healthCheckController);
routes.use('*', notFoundController);

routes.use(errorHandler);

export { routes };
