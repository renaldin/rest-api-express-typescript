import { Request, Response } from "express"
import MasterMenu from "../db/models/MasterMenu"
import ResponseDataHelper from "../helpers/ResponseDataHelper"

const Index = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await MasterMenu.findAll()

    return res.status(200).send(ResponseDataHelper.ok(200, "Data found", result))
  } catch(error: any) {
    return res.status(500).send(ResponseDataHelper.badRequest(500, error))
  }
}

const GetById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params

    const result = await MasterMenu.findOne({
      where: {
        id: id,
        active: true
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
    const { name, icon, ordering } = req.body

    const result = await MasterMenu.create({
      name,
      icon,
      ordering,
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
    const { name, icon, ordering } = req.body

    const result = await MasterMenu.findOne({
      where: {
        id: id,
        active: true
      }
    })

    if (!result) {
      return res.status(404).send(ResponseDataHelper.notFound(404, 'Data not found'))
    }

    result.name = name
    result.icon = icon
    result.ordering = ordering
    await result.save()

    return res.status(200).send(ResponseDataHelper.ok(200, 'Data found', result))
  } catch(error: any) {
    return res.status(500).send(ResponseDataHelper.badRequest(500, error))
  }
}

const SoftDeleteMenu = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params

    const result = await MasterMenu.findOne({
      where: {
        id: id
      }
    })

    if (!result) {
      return res.status(404).send(ResponseDataHelper.notFound(404, 'Data not found'))
    }

    result.active = false
    await result.save()

    return res.status(200).send(ResponseDataHelper.ok(200, 'Updated active menu successfuly', result.active))
  } catch(error: any) {
    return res.status(500).send(ResponseDataHelper.badRequest(500, error))
  }
}

const DeletePermanent = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params

    const result = await MasterMenu.findOne({
      where: {
        id: id
      }
    })

    if (!result) {
      return res.status(404).send(ResponseDataHelper.notFound(404, 'Data not found'))
    }

    await MasterMenu.destroy()
    
    return res.status(200).send(ResponseDataHelper.ok(200, 'Deleted successfully!', null))
  } catch(error: any) {
    return res.status(500).send(ResponseDataHelper.badRequest(500, error))
  }
}

const GetActiveMenu = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await MasterMenu.findAll({
      where: {
        active: true
      }
    })

    return res.status(200).send(ResponseDataHelper.ok(200, "Data found", result))
  } catch(error: any) {
    return res.status(500).send(ResponseDataHelper.badRequest(500, error))
  }
}

export default { Index, GetById, Create, Update, SoftDeleteMenu, DeletePermanent, GetActiveMenu }