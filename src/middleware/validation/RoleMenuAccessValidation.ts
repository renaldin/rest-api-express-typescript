import Validator from "validatorjs"
import { Request, Response, NextFunction } from "express"
import ResponseDataHelper from "../../helpers/ResponseDataHelper"
import Role from "../../db/models/Role"
import Submenu from "../../db/models/Submenu"

const Create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { roleId, submenuId } = req.body

    const data = {
      roleId, submenuId
    }

    const rules: Validator.Rules = {
      'roleId': 'required|numeric',
      'submenuId': 'required|numeric'
    }

    const validate = new Validator(data, rules)

    if (validate.fails()) {
      return res.status(400).send(ResponseDataHelper.validateError(400, 'Validation Error', validate.errors))
    }

    const role = await Role.findOne({
      where: {
        id: roleId,
        active: true
      }
    })

    if (!role) {
      const error = {
        errors: {
          roleId: [
            'Role not found'
          ]
        }
      }
      return res.status(400).send(ResponseDataHelper.validateError(400, 'Validation Error', error))
    }

    const subMenu = await Submenu.findOne({
      where: {
        id: submenuId,
        active: true
      }
    })

    if (!subMenu) {
      const error = {
        errors: {
          submenuId: [
            'Sub menu not found'
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
