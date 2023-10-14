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
    
    next()
  } catch (error: any) {
    return res.status(500).send(ResponseDataHelper.badRequest(500, error))
  }
}

export default { Authenticated }
