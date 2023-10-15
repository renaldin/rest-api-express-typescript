import { Request, Response } from "express"
import RoleMenuAccess from "../db/models/RoleMenuAccess"
import ResponseDataHelper from "../helpers/ResponseDataHelper"
import Submenu from "../db/models/Submenu"
import Role from "../db/models/Role"
import { Model } from "sequelize"

const Index = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await RoleMenuAccess.findAll({
      include: [
        {
          model: Submenu,
          attributes: ['name', 'url', 'title', 'icon', 'ordering', 'isTargetSelf']
        },
        {
          model: Role,
          attributes: ['roleName']
        }
      ]
    })
    
    return res.status(200).send(ResponseDataHelper.ok(200, 'Data found', result))
  } catch(error: any) {
    return res.status(500).send(ResponseDataHelper.badRequest(500, error))
  }
}

const GetActiveRoleMenuAccess = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await RoleMenuAccess.findAll({
      where: {
        active: true
      },
      include: [
        {
          model: Submenu,
          attributes: ['name', 'url', 'title', 'icon', 'ordering', 'isTargetSelf']
        },
        {
          model: Role,
          attributes: ['roleName']
        }
      ]
    })

    return res.status(200).send(ResponseDataHelper.ok(200, 'Data found', result))
  } catch(error) {
    return res.status(500).send(ResponseDataHelper.badRequest(500, error))
  }
}

const GetById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params
    const result = await RoleMenuAccess.findOne({
      where: {
        id: id
      },
      include: [
        {
          model: Submenu,
          attributes: ['name', 'url', 'title', 'icon', 'ordering', 'isTargetSelf']
        },
        {
          model: Role,
          attributes: ['roleName']
        }
      ]
    })

    if (!result) {
      return res.status(404).send(ResponseDataHelper.notFound(404, 'Data not found'))
    }

    return res.status(200).send(ResponseDataHelper.ok(200, 'Data found', result))
  } catch(error: any) {
    return res.status(500).send(ResponseDataHelper.badRequest(500, error))
  }
}

const Create = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { roleId, submenuId } = req.body

    const result = await RoleMenuAccess.create({
      roleId, 
      submenuId,
      active: true
    })

    return res.status(201).send(ResponseDataHelper.ok(201, 'Created successfully!', result))
  } catch(error: any) {
    return res.status(500).send(ResponseDataHelper.badRequest(500, error))
  }
}

const Update = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params
    const { roleId, submenuId } = req.body

    const result = await RoleMenuAccess.findOne({
      where: {
        id: id
      }
    })

    if (!result) {
      return res.status(404).send(ResponseDataHelper.notFound(404, 'Data not found'))
    }

    result.roleId = roleId
    result.submenuId = submenuId
    await result.save()

    return res.status(200).send(ResponseDataHelper.ok(200, 'Updated successfully!', result))
  } catch(error: any) {
    return res.status(500).send(ResponseDataHelper.badRequest(500, error))
  }
}

const DeleteSoft = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params
    
    const result = await RoleMenuAccess.findOne({
      where: {
        id: id,
        active: true
      }
    })

    if (!result) {
      return res.status(404).send(ResponseDataHelper.notFound(404, 'Data not found'))
    }

    result.active = false
    await result.save()

    return res.status(200).send(ResponseDataHelper.ok(200, 'Deleted role menu access soft successfully!', null))
  } catch(error: any) {
    return res.status(500).send(ResponseDataHelper.badRequest(500, error))
  }
}

const DeletePermanent = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params

    const result = await RoleMenuAccess.findOne({
      where: {
        id: id
      }
    })

    if (!result) {
      return res.status(404).send(ResponseDataHelper.notFound(404, 'Data not found'))
    }

    await result.destroy()

    return res.status(200).send(ResponseDataHelper.ok(200, 'Deleted role menu access permanent successfully!', null))
  } catch(error: any) {
    return res.status(500).send(ResponseDataHelper.badRequest(500, error))
  }
}

export default { Index, GetActiveRoleMenuAccess, GetById, Create, Update, DeleteSoft, DeletePermanent }
