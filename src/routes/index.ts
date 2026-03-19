import { Router } from 'express';
import { usersRoutes } from './users-route';
import { sessionsRoutes } from './sessions-route';
import { deliveriesRoutes } from './deliveries-route';

export const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRoutes)
routes.use("/deliveries", deliveriesRoutes)