import express from "express"
import cors from "cors"

import criminalRoutes from "./routes/criminal.routes"
import crimeRoutes from "./routes/crimes.routes"
import weaponRoutes from "./routes/weapons.routes"

const app = express()

app.use(express.json())
app.use(cors())
app.use(criminalRoutes)
app.use(crimeRoutes)
app.use(weaponRoutes)

app.listen(3333, () => {
  console.log("Server running on port 3333.")
})
