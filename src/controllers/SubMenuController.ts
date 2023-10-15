import { Request, Response } from "express"
import Submenu from "../db/models/Submenu"
import ResponseDataHelper from "../helpers/ResponseDataHelper"

const Index = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await Submenu.findAll()

    return res.status(200).send(ResponseDataHelper.ok(200, 'Data found', result))
  } catch(error: any) {
    return res.status(500).send(ResponseDataHelper.badRequest(500, error))
  }
}

const GetActiveSubMenu = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await Submenu.findAll({
      where: {
        active: true
      }
    })

    return res.status(200).send(ResponseDataHelper.ok(200, 'Data found', result))
  } catch(error: any) {
    return res.status(500).send(ResponseDataHelper.badRequest(500, error))
  }
}

const GetById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params

    const result = await Submenu.findOne({
      where: {
        id: id
      }
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
    const { name, masterMenuId, url, title, icon, ordering, isTargetSelf } = req.body

    const result = await Submenu.create({
      name,
      masterMenuId,
      url,
      title,
      icon,
      ordering,
      isTargetSelf,
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
    const { name, masterMenuId, url, title, icon, ordering, isTargetSelf } = req.body

    const result = await Submenu.findOne({
      where: {
        id: id
      }
    })

    if (!result) {
      return res.status(404).send(ResponseDataHelper.notFound(404, 'Data not found'))
    }

    result.name = name
    result.masterMenuId = masterMenuId
    result.url = url
    result.title = title,
    result.icon = icon
    result.ordering = ordering,
    result.isTargetSelf = isTargetSelf
    await result.save()

    return res.status(200).send(ResponseDataHelper.ok(200, 'Data found', result))
  } catch(error: any) {
    return res.status(500).send(ResponseDataHelper.badRequest(500, error))
  }
}

const DeleteSoft = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params

    const result = await Submenu.findOne({
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

    return res.status(200).send(ResponseDataHelper.ok(200, 'Deleted soft successfully!', null))
  } catch(error: any) {
    return res.status(500).send(ResponseDataHelper.badRequest(500, error))
  }
}

const DeletePermanent = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params

    const result = await Submenu.findOne({
      where: {
        id: id
      }
    })

    if (!result) {
      return res.status(404).send(ResponseDataHelper.notFound(404, 'Data not found'))
    }

    await result.destroy()

    return res.status(200).send(ResponseDataHelper.ok(404, 'Deleted permanent successfully!', null))
  } catch(error: any) {
    return res.status(500).send(ResponseDataHelper.badRequest(500, error))
  }
}

export default { Index, GetActiveSubMenu, GetById, Create, Update, DeleteSoft, DeletePermanent }
