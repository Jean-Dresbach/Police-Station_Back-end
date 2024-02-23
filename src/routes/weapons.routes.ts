import express from "express"
import { WeaponController } from "../controllers/weapons.controller"

const router = express.Router()

const weaponController = new WeaponController()

router.get("/weapons", weaponController.index)
router.get("/weapons/:id", weaponController.show)

router.post("/weapons", weaponController.store)

router.put("/weapons/:id", weaponController.update)

router.delete("/weapons/:id", weaponController.delete)

export default router
