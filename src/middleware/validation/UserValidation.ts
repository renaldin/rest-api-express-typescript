import Validator from "validatorjs"
import { Request, Response, NextFunction } from "express"
import ResponseDataHelper from "../../helpers/ResponseDataHelper"
import User from "../../db/models/User"

const RegisterValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, roleId, confirmPassword } = req.body

    const data = {
      name,
      email,
      roleId,
      password,
      confirmPassword
    }

    const rules: Validator.Rules = {
      "name": "required|string|max:50",
      "email": "required|email",
      "roleId": "required",
      "password": "required|min:8",
      "confirmPassword": "required|same:password"
    }

    const validate = new Validator(data, rules)

    if (validate.fails()) {
      return res.status(400).send(ResponseDataHelper.validateError(400, "Validation Error", validate.errors))
    }

    const user = await User.findOne({
      where: {
        email: data.email
      }
    })

    if (user) {
      const error = {
        errors: {
          email: [
            "Email is already in use"
          ]
        }
      }
      return res.status(400).send(ResponseDataHelper.validateError(400, "Validation Error" ,error))
    }

    next()
  } catch (error: any) {
    return res.status(500).send(ResponseDataHelper.badRequest(500, error))
  }
}

export default { RegisterValidation }
