import { Request, Response } from "express"
import User from "../db/models/User"
import ResponseDataHelper from "../helpers/ResponseDataHelper"
import PasswordHelper from "../helpers/PasswordHelper"
import TokenHelper from "../helpers/TokenHelper"

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

const Login = async (req: Request, res: Response):Promise<Response> => {
 try {
  const { email, password } = req.body

  const user = await User.findOne({
    where: {
      email: email
    }
  })

  if (!user) {
    return res.status(401).send(ResponseDataHelper.notFound(401, "Unauthorized"))
  }

  const matched = await PasswordHelper.PasswordCompare(password, user.password)

  if (!matched) {
    return res.status(401).send(ResponseDataHelper.notFound(401, "Unauthorized"))
  }

  const userData = {
    name: user.name,
    email: user.email,
    roleId: user.roleId,
    verified: user.verified,
    active: user.active
  }

  const token = TokenHelper.generate(userData)
  const refreshToken = TokenHelper.refresh(userData)

  user.accessToken = refreshToken
  await user.save()

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  })

  const userResponse = {
    name: user.name,
    email: user.email,
    roleId: user.roleId,
    verified: user.verified,
    active: user.active,
    token: token
  }

  return res.status(200).send(ResponseDataHelper.ok(200, "Login successfully", userResponse))
 } catch (error: any) {
  return res.status(500).send(ResponseDataHelper.badRequest(500, error))
 }
}

const RefreshToken = async (req: Request, res: Response):Promise<Response> => {
  try {
    const refreshToken = req.cookies?.refreshToken

    if (!refreshToken) {
      return res.status(401).send(ResponseDataHelper.notFound(401, "Unauthorized!"))
    }
    
    const decodedUser = TokenHelper.extractRefresh(refreshToken)
    
    if (!decodedUser) {
      return res.status(401).send(ResponseDataHelper.notFound(401, "Unauthorized!"))
    }

    const token = TokenHelper.generate({
      name: decodedUser.name,
      email: decodedUser.email,
      roleId: decodedUser.roleId,
      verified: decodedUser.verified,
      active: decodedUser.active
    })

    const resultUser = {
      name: decodedUser.name,
      email: decodedUser.email,
      roleId: decodedUser.roleId,
      verified: decodedUser.verified,
      active: decodedUser.active,
      token: token
    }

    return res.status(200).send(ResponseDataHelper.ok(200, "Ok", resultUser))
  } catch(error: any) {
    return res.status(500).send(ResponseDataHelper.badRequest(500, error))
  }
}

export default { Register, Login, RefreshToken }