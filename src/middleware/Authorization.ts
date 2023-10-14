import { Request, Response, NextFunction } from "express"
import ResponseDataHelper from "../helpers/ResponseDataHelper"
import TokenHelper from "../helpers/TokenHelper"

const Authenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.headers["authorization"]
    const token = authToken && authToken.split(" ")[1]
    
    if (token === null) {
      return res.status(401).send(ResponseDataHelper.notFound(401, "Unauthorized"))
    }
    
    const result = TokenHelper.extract(token!)
    
    if (!result) {
      return res.status(401).send(ResponseDataHelper.notFound(401, "Unauthorized"))
    }

    res.locals.userEmail = result?.email
    res.locals.roleId = result?.roleId
    
    next()
  } catch (error: any) {
    return res.status(500).send(ResponseDataHelper.badRequest(500, error))
  }
}

const SuperAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const roleId = res.locals.roleId
    if (roleId !== 1) {
      return res.status(403).send(ResponseDataHelper.notFound(403, "Forbidden"))
    }

    next()
  } catch(error: any) {
    return res.status(500).send(ResponseDataHelper.badRequest(500, error))
  }
}

const Admin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const roleId = res.locals.roleId
    if (roleId !== 2) {
      return res.status(403).send(ResponseDataHelper.notFound(403, 'Forbidden'))
    }

    next()
  } catch(error: any) {
    return res.status(500).send(ResponseDataHelper.badRequest(500, error))
  }
}

const User = (req: Request, res: Response, next: NextFunction) => {
  try {
    const roleId = res.locals.roleId
    if (roleId !== 3) {
      return res.status(403).send(ResponseDataHelper.notFound(403, 'Forbidden'))
    }

    next()
  } catch(error: any) {
    return res.status(500).send(ResponseDataHelper.badRequest(500, error))
  }
}

export default { Authenticated, SuperAdmin, Admin, User }
