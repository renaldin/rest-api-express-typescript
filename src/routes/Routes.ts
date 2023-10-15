import express from "express"

import RoleController from "../controllers/RoleController"
import UserController from "../controllers/UserController"

import UserValidation from "../middleware/validation/UserValidation"
import Authorization from "../middleware/Authorization"
import MasterMenuController from "../controllers/MasterMenuController"
import MenuValidation from "../middleware/validation/MenuValidation"
import SubMenuController from "../controllers/SubMenuController"
import SubMenuValidation from "../middleware/validation/SubMenuValidation"
import RoleMenuAccessController from "../controllers/RoleMenuAccessController"
import RoleMenuAccessValidation from "../middleware/validation/RoleMenuAccessValidation"

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
router.delete('/menu/delete/:id/soft', Authorization.Authenticated, Authorization.Admin, MasterMenuController.SoftDeleteMenu)
router.delete('/menu/delete/:id/permanent', Authorization.Authenticated, Authorization.SuperAdmin, MasterMenuController.DeletePermanent)

// sub menu routing
router.get('/sub-menu', Authorization.Authenticated, Authorization.Admin, SubMenuController.GetActiveSubMenu)
router.get('/sub-menu/all', Authorization.Authenticated, Authorization.SuperAdmin, SubMenuController.Index)
router.get('/sub-menu/:id', Authorization.Authenticated, Authorization.Admin, SubMenuController.GetById)
router.post('/sub-menu', SubMenuValidation.Create, Authorization.Authenticated, Authorization.Admin, SubMenuController.Create)
router.put('/sub-menu/:id', SubMenuValidation.Create, Authorization.Authenticated, Authorization.Admin, SubMenuController.Update)
router.delete('/sub-menu/delete/:id/soft', Authorization.Authenticated, Authorization.Admin, SubMenuController.DeleteSoft)
router.delete('/sub-menu/delete/:id/permanent', Authorization.Authenticated, Authorization.SuperAdmin, SubMenuController.DeletePermanent)

// role menu access routing
router.get('/role-menu-access', Authorization.Authenticated, Authorization.SuperAdmin, RoleMenuAccessController.GetActiveRoleMenuAccess)
router.get('/role-menu-access/all', Authorization.Authenticated, Authorization.SuperAdmin, RoleMenuAccessController.Index)
router.get('/role-menu-access/:id', Authorization.Authenticated, Authorization.SuperAdmin, RoleMenuAccessController.GetById)
router.post('/role-menu-access', RoleMenuAccessValidation.Create, Authorization.Authenticated, Authorization.SuperAdmin, RoleMenuAccessController.Create)
router.put('/role-menu-access/:id', RoleMenuAccessValidation.Create, Authorization.Authenticated, Authorization.SuperAdmin, RoleMenuAccessController.Update)
router.delete('/role-menu-access/delete/:id/soft', Authorization.Authenticated, Authorization.SuperAdmin, RoleMenuAccessController.DeleteSoft)
router.delete('/role-menu-access/delete/:id/permanent', Authorization.Authenticated, Authorization.SuperAdmin, RoleMenuAccessController.DeletePermanent)

export default router
