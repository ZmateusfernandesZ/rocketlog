import { Request, Response } from 'express';
import { prisma } from '@/database/prisma';
import { z } from 'zod'
import { AppError } from '@/utils/appError';
import { constants } from 'buffer';

export class DeliveriesLogsController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            delivery_id: z.string().uuid(),
            description: z.string().trim().min(1)

        })

        const { delivery_id, description } = bodySchema.parse(request.body)

        const delivery = await prisma.delivery.findUnique({
            where: { id: delivery_id }
        })

        if (!delivery) {
            throw new AppError("Pedido não encontrada", 404)
        }

        if (delivery.status === "delivered"){
            throw new AppError("this order is already delivered")
        }

        if (delivery.status === "processing"){
            throw new AppError("change status to shipped")
        }

        await prisma.deliveryLog.create({
            data: {
                deliveryId: delivery_id,
                description
            }
        })


        return response.json().status(201)
    }

    async show(request: Request, response: Response) {

        const paramsSchema = z.object({
            delivery_id: z.string().uuid()
        })

        const { delivery_id } = paramsSchema.parse(request.params)

        const delivery = await prisma.delivery.findUnique({
            where: { id: delivery_id },
            include: {
                Logs: {
                    select: {
                        description: true,
                        updatedAt: true,
                        
                    }
                },
                user: {
                    select: {
                        name: true, 
                }}
            }
        })
    

        if (request.user?.role === "customer" && request.user.id !== delivery?.userId) {
            throw new AppError("The user can only view their deliveries", 401)
        }

        



        return response.json(delivery)

    }
}