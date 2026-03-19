import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@/utils/appError";

export function verifyUserAuthorization(role: string[]){
    return (request: Request, response: Response, next: NextFunction) => {
        if (!request.user){
            throw new AppError("Usuário não autenticado", 401)
        }

        if (!role.includes(request.user.role)) {
            throw new AppError("Usuário não autenticado", 401)
        }

        return next()
    }
}