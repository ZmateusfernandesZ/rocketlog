import { Router } from 'express';
import { usersRoutes } from './users-route';
import { sessionsRoutes } from './sessions-route';

export const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRoutes)