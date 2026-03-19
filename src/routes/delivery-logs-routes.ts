import { Router } from 'express';
import { DeliveriesLogsController } from '../controllers/delivery-logs-controller';
import { ensureAuthenticated } from '@/middlewares/ensure-authenticated';
import { verifyUserAuthorization } from '@/middlewares/verifyUserAuthorization'; 

export const deliveriesLogsRoutes = Router()
const deliveriesLogsController = new DeliveriesLogsController()

deliveriesLogsRoutes.post("/", ensureAuthenticated, verifyUserAuthorization(["sale"]), deliveriesLogsController.create)


