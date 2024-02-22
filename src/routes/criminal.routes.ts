import express from "express"

import { CriminalController } from "../controllers/criminal.controller"

const router = express.Router()

const criminalController = new CriminalController()

router.get("/criminals", criminalController.index)
router.post("/criminals", criminalController.store)

export default router
