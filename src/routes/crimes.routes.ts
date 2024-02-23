import express from "express"

import { CrimesController } from "../controllers/crimes.controller"

const router = express.Router()

const crimesController = new CrimesController()

router.get("/crimes", crimesController.index)
router.get("/crimes/:id", crimesController.show)
router.get("/crimes/weapons/:id", crimesController.findWeaponOfACrime)

router.put("/crimes/:id", crimesController.update)

router.post("/crimes", crimesController.store)

router.delete("/crimes/:id", crimesController.delete)

export default router
