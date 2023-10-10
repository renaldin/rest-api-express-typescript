import { Request, Response } from "express"
import User from "../db/models/User"
import ResponseDataHelper from "../helpers/ResponseDataHelper"
import PasswordHelper from "../helpers/PasswordHelper"

const Register = async (req: Request, res: Response):Promise<Response> => {
  try {
    const { name, email, password, confirmPassword } = req.body

    const hashed = await PasswordHelper.PasswordHashing(password)

    const result = await User.create({
      name,
      email,
      roleId: 1,
      password: hashed,
      active: true,
      verified: true
    })

    return res.status(201).send(ResponseDataHelper.ok(201, "Created an successfully", result))
  } catch (error:any) {
    return res.status(500).send(ResponseDataHelper.badRequest(500, error))    
  }
}

export default { Register }