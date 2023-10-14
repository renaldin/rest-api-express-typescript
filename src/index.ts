import express, { Request, Response } from "express"
import dotenv from "dotenv"
import router from "./routes/Routes"
import cookieParser = require("cookie-parser")

dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({
    response: "Express Typescript",
  })
})

app.use(router)

app.listen(process.env.APP_PORT, () => {
  console.log(
    `${process.env.APP_NAME}: running on port ${process.env.APP_PORT}`
  )
})
