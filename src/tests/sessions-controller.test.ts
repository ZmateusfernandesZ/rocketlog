import request from "supertest"
import { app } from "@/app"
import { prisma } from "@/database/prisma"

describe("SessionsController", () => {
    let user_id: string
    afterAll(async () => {
        await prisma.user.delete({
            where: {
                id: user_id
            }
        })
    })
    it("Se o usuário se autentica e retorna token", async () =>{
        const userResponse = await request(app)
                    .post("/users")
                    .send({
                        name: "Teste User",
                        email: "Teste@example.com",
                        password: "123456"
                })
                    user_id = userResponse.body.id

                    const sessionResponse = await request(app).post("/sessions").send({
                        email: "Teste@example.com",
                        password: "123456"
                    })

                    expect(sessionResponse.status).toBe(200)
                    expect(sessionResponse.body.token).toEqual(expect.any(String))
        
                
        
    })
})