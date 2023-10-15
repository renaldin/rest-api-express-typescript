import Validator from "validatorjs"
import { Request, Response, NextFunction } from "express"
import ResponseDataHelper from "../../helpers/ResponseDataHelper"

const Create = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, icon, ordering } = req.body
    
    const data = {
      name, icon, ordering
    }

    const rules: Validator.Rules = {
      'name': 'required|string|max:50',
      'icon': 'required|string',
      'ordering': 'required|number'
    }

    const validate = new Validator(data, rules)

    if (validate.fails()) {
      return res.status(400).send(ResponseDataHelper.validateError(400, 'Validation Error', validate.errors))
    }

    next()
  } catch(error: any) {
    return res.status(500).send(ResponseDataHelper.badRequest(500, error))
  }
}

export default { Create }