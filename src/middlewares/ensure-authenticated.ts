import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/appError";

interface TokenPayload {
    role: string
    sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    try {
        const authHeader = request.headers.authorization
        if (!authHeader) {
            throw new AppError("Token de autenticação não encontrado", 401)
        }

        const [, token] = authHeader.split(" ")
        const { role, sub: user_id } = verify(token, authConfig.jwt.secret) as TokenPayload 

        request.user = {
            id: user_id,
            role
        }

        return next()

    } catch (error) {
        throw new AppError("Token de autenticação inválido", 401)
    }
    

}