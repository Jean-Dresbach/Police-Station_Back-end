import express from "express"

import { CriminalController } from "../controllers/criminal.controller"

const router = express.Router()

const criminalController = new CriminalController()

router.get("/criminals", criminalController.index)
router.get("/criminals/:id", criminalController.show)

router.post("/criminals", criminalController.store)

// router.put("/criminals/:id", criminalController.show)

export default router
