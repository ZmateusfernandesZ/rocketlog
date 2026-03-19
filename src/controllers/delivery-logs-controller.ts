import { Request, Response } from 'express';
import { prisma } from '@/database/prisma';
import { z } from 'zod'

export class DeliveriesLogsController {
    async create(request: Request, response: Response) {
        

        return response.json()
    }

}