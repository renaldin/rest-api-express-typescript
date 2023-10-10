import { Request, Response } from "express"
import Role from "../db/models/Role"
import ResponseDataHelper from "../helpers/ResponseDataHelper"

const GetRole = async (req: Request, res: Response):Promise<Response> => {
  try {
    const result = await Role.findAll({
      where: {
        active: true
      }
    })

    return res.status(200).send(ResponseDataHelper.ok(200, "Data found", result))
  } catch (error: any) {
    return res.status(500).send(ResponseDataHelper.badRequest(500, error))
  }
}

const CreateRole = async (req: Request, res: Response):Promise<Response> => {
  try {
    const { roleName, active } = req.body

    const result = await Role.create({
      roleName,
      active
    })

    return res.status(201).send(ResponseDataHelper.ok(201, "Created an successfully!", result))
  } catch (error:any) {
    return res.status(500).send(ResponseDataHelper.badRequest(500, error))
  }
}

const UpdateRole = async (req: Request, res: Response):Promise<Response> => {
  try {
    const { id } = req.params
    const { roleName, active } = req.body

    const result = await Role.findByPk(id)

    if(!result) {
      return res.status(404).send(ResponseDataHelper.notFound(404, "Data not found"))
    }

    result.roleName = roleName
    result.active = active

    await result.save()

    return res.status(200).send(ResponseDataHelper.ok(200, "Updated an succesfully!", result))
  } catch (error:any) {
    return res.status(500).send(ResponseDataHelper.badRequest(500, error))
  }
}

const DeleteRole = async (req: Request, res: Response):Promise<Response> => {
  try {
    const { id } = req.params

    const result = await Role.findByPk(id)

    if(!result) {
       const error = {
        errors: {
          message: "Data not found"
        }
      }
      
      return res.status(404).send(ResponseDataHelper.notFound(404, "Data not Found"))
    }

    await result.destroy()

    return res.status(200).send(ResponseDataHelper.ok(200, "Deleted an successfully!", null))
  } catch (error:any) {
    return res.status(500).send(ResponseDataHelper.badRequest(500, error))
  }
}

const GetRoleById = async (req: Request, res: Response):Promise<Response> => {
  try {
    const { id } = req.params

    const result = await Role.findByPk(id)

    if(!result) {
      return res.status(404).send(ResponseDataHelper.notFound(404, "Data not found"))
    }

    return res.status(200).send(ResponseDataHelper.ok(200, "Data found", result))
  } catch (error:any) {
    return res.status(500).send(ResponseDataHelper.badRequest(500, error))
  }
}

export default { GetRole, CreateRole, UpdateRole, DeleteRole, GetRoleById }
