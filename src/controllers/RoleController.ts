import { Request, Response } from "express"
import Role from "../db/models/Role"

const GetRole = async (req: Request, res: Response):Promise<Response> => {
  try {
    const result = await Role.findAll({
      where: {
        active: true
      }
    })

    return res.status(200).send({
      status: 200,
      message: "Ok",
      data: result
    })
  } catch (error:any) {
    if(error != null && error instanceof Error) {
      return res.status(500).send({
        status: 500,
        message: error.message,
        errors: error
      })
    }

    return res.status(500).send({
      status: 500,
      message: "Internal server error",
      errors: error
    })
  }
}

const CreateRole = async (req: Request, res: Response):Promise<Response> => {
  try {
    const { roleName, active } = req.body

    const result = await Role.create({
      roleName,
      active
    })

    return res.status(201).send({
      status: 201,
      message: "Create an succesfully!",
      data: result
    })
  } catch (error:any) {
    if(error != null && error instanceof Error) {
      return res.status(500).send({
        status: 500,
        message: error.message,
        errors: error
      })
    }

    return res.status(500).send({
      status: 500,
      message: "Internal server error",
      errors: error
    })
  }
}

const UpdateRole = async (req: Request, res: Response):Promise<Response> => {
  try {
    const { id } = req.params
    const { roleName, active } = req.body

    const result = await Role.findByPk(id)

    if(!result) {
      return res.status(404).send({
        status: 404,
        message: "Data not found",
        data: null
      })
    }

    result.roleName = roleName
    result.active = active

    await result.save()

    return res.status(200).send({
      status: 200,
      message: "Update an successfully!",
      data: result
    })
  } catch (error:any) {
    if(error != null && error instanceof Error) {
      return res.status(500).send({
        status: 500,
        message: error.message,
        errors: error
      })
    }

    return res.status(500).send({
      status: 500,
      message: "Internal server error",
      errors: error
    })
  }
}

const DeleteRole = async (req: Request, res: Response):Promise<Response> => {
  try {
    const { id } = req.params

    const result = await Role.findByPk(id)

    if(!result) {
      return res.status(404).send({
        status: 404,
        message: "Data not found",
        data: null
      })
    }

    await result.destroy()

    return res.status(200).send({
      status: 200,
      message: "Delete an successfully!",
      data: null
    })
  } catch (error:any) {
    if(error != null && error instanceof Error) {
      return res.status(500).send({
        status: 500,
        message: error.message,
        errors: error
      })
    }

    return res.status(500).send({
      status: 500,
      message: "Internal server error",
      errors: error
    })
  }
}

const GetRoleById = async (req: Request, res: Response):Promise<Response> => {
  try {
    const { id } = req.params

    const result = await Role.findByPk(id)

    if(!result) {
      return res.status(404).send({
        status: 404,
        message: "Data not found",
        data: null
      })
    }

    return res.status(200).send({
      status: 200,
      message: "Data is found",
      data: result
    })
  } catch (error:any) {
    if(error != null && error instanceof Error) {
      return res.status(500).send({
        status: 500,
        message: error.message,
        errors: error
      })
    }

    return res.status(500).send({
      status: 500,
      message: "Internal server error",
      errors: error
    })
  }
}

export default { GetRole, CreateRole, UpdateRole, DeleteRole, GetRoleById }
