import request from "supertest"
import { app } from "@/app"
import { prisma } from "@/database/prisma"

describe("usersController", () => {
    let user_id: string

    afterAll(async () => {
        await prisma.user.delete({
            where: {
                id: user_id
            }
        })
    })

    it("should create a new uuser successfuly", async () => {
        const response = await request(app)
            .post("/users")
            .send({
                name: "Teste User",
                email: "Teste@example.com",
                password: "123456"
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")
        expect(response.body.email).toBe("Teste@example.com")

        user_id = response.body.id

    })

    it("criar emaail já existente", async () => {
        const response = ((await request(app)
        .post("/users")
        .send({
            name: "Duplicate User",
            email: "Teste@example.com",
            password: "123456"
            })

        ))
        expect(response.status).toBe(400)

    })

    it("criar emaail Inválido", async () => {
        const response = ((await request(app)
        .post("/users")
        .send({
            name: "Duplicate User",
            email: "invalid-email",
            password: "123456"
            })

        ))
        expect(response.status).toBe(400)
        

    })

    it("criar usuário com password com menos de 6 caracteres", async () => {
        const response = ((await request(app)
        .post("/users")
        .send({
            name: "Duplicate User",
            email: "Teste@example.com",
            password: "12345"
            })

        ))
        expect(response.status).toBe(400)
       

    })

})