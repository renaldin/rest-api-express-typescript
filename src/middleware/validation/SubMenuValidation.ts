import Validator from "validatorjs"
import { Request, Response, NextFunction } from "express"
import ResponseDataHelper from "../../helpers/ResponseDataHelper"
import MasterMenu from "../../db/models/MasterMenu"


const Create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, masterMenuId, url, title, icon, ordering, isTargetSelf } = req.body

    const data = {
      name, masterMenuId, url, title, icon, ordering, isTargetSelf
    }

    const rules: Validator.Rules = {
      'name': 'required|string|max:50',
      'masterMenuId': 'required|numeric',
      'url': 'required|string',
      'title': 'required|string|max:50',
      'icon': 'required|string',
      'ordering': 'required|numeric',
      'isTargetSelf': 'required|boolean'
    }

    const validate = new Validator(data, rules)

    if (validate.fails()) {
      return res.status(400).send(ResponseDataHelper.validateError(400, 'Validation Error', validate.errors))
    }

    const menu = await MasterMenu.findOne({
      where: {
        id: masterMenuId,
        active: true
      }
    })

    if (!menu) {
      const error = {
        errors: {
          masterMenuId: [
            'Master Menu not found!'
          ]
        }
      }
      return res.status(400).send(ResponseDataHelper.validateError(400, 'Validation Error', error))
    }

    next()
  } catch(error: any) {
    return res.status(500).send(ResponseDataHelper.badRequest(500, error))
  }
}

export default { Create }
