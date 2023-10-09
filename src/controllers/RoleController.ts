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

    return res.status(200).send(ResponseDataHelper.ResponseData(200, "Data found", null, result))
  } catch (error: any) {
    return res.status(500).send(ResponseDataHelper.ResponseData(500, "", error, null))
  }
}

const CreateRole = async (req: Request, res: Response):Promise<Response> => {
  try {
    const { roleName, active } = req.body

    const result = await Role.create({
      roleName,
      active
    })

    return res.status(201).send(ResponseDataHelper.ResponseData(201, "Created an successfully!", null, result))
  } catch (error:any) {
    return res.status(500).send(ResponseDataHelper.ResponseData(500, "", error, null))
  }
}

const UpdateRole = async (req: Request, res: Response):Promise<Response> => {
  try {
    const { id } = req.params
    const { roleName, active } = req.body

    const result = await Role.findByPk(id)

    if(!result) {
      return res.status(404).send(ResponseDataHelper.ResponseData(404, "Data not found", null, null))
    }

    result.roleName = roleName
    result.active = active

    await result.save()

    return res.status(200).send(ResponseDataHelper.ResponseData(200, "Updated an succesfully!", null, result))
  } catch (error:any) {
    return res.status(500).send(ResponseDataHelper.ResponseData(500, "", error, null))
  }
}

const DeleteRole = async (req: Request, res: Response):Promise<Response> => {
  try {
    const { id } = req.params

    const result = await Role.findByPk(id)

    if(!result) {
      return res.status(404).send(ResponseDataHelper.ResponseData(404, "Data not found", null, null))
    }

    await result.destroy()

    return res.status(200).send(ResponseDataHelper.ResponseData(200, "Deleted an successfully!", null, null))
  } catch (error:any) {
    return res.status(500).send(ResponseDataHelper.ResponseData(500, "", error, null))
  }
}

const GetRoleById = async (req: Request, res: Response):Promise<Response> => {
  try {
    const { id } = req.params

    const result = await Role.findByPk(id)

    if(!result) {
      return res.status(404).send(ResponseDataHelper.ResponseData(404, "Data not found", null, null))
    }

    return res.status(200).send(ResponseDataHelper.ResponseData(200, "Data found", null, result))
  } catch (error:any) {
    return res.status(500).send(ResponseDataHelper.ResponseData(500, "", error, null))
  }
}

export default { GetRole, CreateRole, UpdateRole, DeleteRole, GetRoleById }
