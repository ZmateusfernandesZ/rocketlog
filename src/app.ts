import express from "express"
import "express-async-errors"
import { errorHandling } from "./middlewares/error-handling"
import { routes } from "./routes"

export const app = express()
//Habilitar o express para receber requisições com body no formato JSON
app.use(express.json())
app.use(routes)
//Tratamento de exceçoes
app.use(errorHandling)


