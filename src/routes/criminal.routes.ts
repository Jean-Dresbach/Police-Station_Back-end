import express from "express"

import { CriminalController } from "../controllers/criminal.controller"

const router = express.Router()

const criminalController = new CriminalController()

router.get("/criminals", criminalController.index)
router.get("/criminals/:id", criminalController.show)
router.get("/criminals/crimes/:id", criminalController.findCrimesOfACriminal)

router.post("/criminals", criminalController.store)

router.put("/criminals/:id", criminalController.update)

router.delete("/criminals/:id", criminalController.delete)

export default router
