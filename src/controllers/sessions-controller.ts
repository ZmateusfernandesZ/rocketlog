import { Request, Response } from 'express';
import { prisma } from '@/database/prisma';
import { z } from 'zod';
import { AppError } from '@/utils/appError';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { authConfig } from '@/configs/auth';

export class SessionsController {
    async create(request: Request, response: Response) {

        const bodySchema = z.object({
            email: z.string().email(),
            password: z.string().min(6)
        })

        const { email, password } = bodySchema.parse(request.body)

        const user = await prisma.user.findFirst({ where: { email } })

        if (!user) {
            throw new AppError("Email ou senha incorretos", 401)
        
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new AppError("Email ou senha incorretos", 401)
        }

        const { secret, expiresIn } = authConfig.jwt

        const token = sign({ role: user.role ?? "customer" }, secret, { subject: user.id, expiresIn })

        const { password: hashPassword, ...userWithoutPassword } = user

        return response.json({ token, ...userWithoutPassword })
    
    }

}