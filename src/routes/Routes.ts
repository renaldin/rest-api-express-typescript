import express from "express"

import RoleController from "../controllers/RoleController"
import UserController from "../controllers/UserController"

import UserValidation from "../middleware/validation/UserValidation"
import Authorization from "../middleware/Authorization"
import MasterMenuController from "../controllers/MasterMenuController"
import MenuValidation from "../middleware/validation/MenuValidation"

const router = express.Router()

// role routing
router.get("/role", Authorization.Authenticated, RoleController.GetRole)
router.get("/role/:id", Authorization.Authenticated, RoleController.GetRoleById)
router.post("/role", Authorization.Authenticated, Authorization.Admin, RoleController.CreateRole)
router.put("/role/:id", Authorization.Authenticated, Authorization.Admin, RoleController.UpdateRole)
router.delete("/role/:id", Authorization.Authenticated, Authorization.SuperAdmin, RoleController.DeleteRole)

// user Routing
router.post("/user/register", UserValidation.RegisterValidation, UserController.Register)
router.post("/user/login", UserController.Login)
router.get("/user/refresh-token", UserController.RefreshToken)
router.get("/user/current-user", Authorization.Authenticated, UserController.CurrentUser)
router.get("/user/logout", Authorization.Authenticated, UserController.Logout)

// master menu routing
router.get('/menu', Authorization.Authenticated, Authorization.Admin, MasterMenuController.GetActiveMenu)
router.get('/menu/all', Authorization.Authenticated, Authorization.SuperAdmin, MasterMenuController.Index)
router.get('/menu/:id', Authorization.Authenticated, Authorization.Admin, MasterMenuController.GetById)
router.post('/menu', MenuValidation.Create, Authorization.Authenticated, Authorization.Admin, MasterMenuController.Create)
router.put('/menu/:id', MenuValidation.Create, Authorization.Authenticated, Authorization.Admin, MasterMenuController.Update)
router.delete('/menu/:id/soft', Authorization.Authenticated, Authorization.Admin, MasterMenuController.SoftDeleteMenu)
router.delete('/menu/:id/permanent', Authorization.Authenticated, Authorization.SuperAdmin, MasterMenuController.DeletePermanent)



export default router
