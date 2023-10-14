import express from "express"

import RoleController from "../controllers/RoleController"
import UserController from "../controllers/UserController"

import UserValidation from "../middleware/validation/UserValidation"
import Authorization from "../middleware/Authorization"

const router = express.Router()

// role routing
router.get("/role", Authorization.Authenticated, RoleController.GetRole)
router.get("/role/:id", RoleController.GetRoleById)
router.post("/role", RoleController.CreateRole)
router.put("/role/:id", RoleController.UpdateRole)
router.delete("/role/:id", RoleController.DeleteRole)

// user Routing
router.post("/user/register", UserValidation.RegisterValidation, UserController.Register)
router.post("/user/login", UserController.Login)
router.get("/user/refresh-token", UserController.RefreshToken)
router.get("/user/current-user", Authorization.Authenticated, UserController.CurrentUser)
router.get("/user/logout", Authorization.Authenticated, UserController.Logout)

export default router
