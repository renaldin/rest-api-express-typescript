import express from "express"
import RoleController from "../controllers/RoleController"
import UserController from "../controllers/UserController"

const router = express.Router()

// role routing
router.get("/role", RoleController.GetRole)
router.get("/role/:id", RoleController.GetRoleById)
router.post("/role", RoleController.CreateRole)
router.put("/role/:id", RoleController.UpdateRole)
router.delete("/role/:id", RoleController.DeleteRole)

// user Routing
router.post("/user/register", UserController.Register)

export default router
