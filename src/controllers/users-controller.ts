import { Request, Response } from 'express';
import { z } from 'zod'
import { hash } from 'bcrypt'
import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/appError';

export class UsersController {
    async create (request: Request, response: Response) {
        const bodySchema = z.object({
            name: z.string().trim().min(1),
            email: z.string().email(),
            password: z.string().min(6)
        })

        const { name, email, password } = bodySchema.parse(request.body)

        const userAlreadyExists = await prisma.user.findFirst({ where: { email } })

        if (userAlreadyExists) {
            throw new AppError("Usuário ja existe com esse email")
        }

        const hashPassword = await hash(password, 8)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword
            }
        })
        // desestruturando o user para não retornar a senha no response
        const { password: _, ...userWithoutPassword } = user

        return response.json( userWithoutPassword )
    }
}