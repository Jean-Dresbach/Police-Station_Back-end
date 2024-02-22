import express from "express"
import cors from "cors"

import criminalRoutes from "./routes/criminal.routes"

const app = express()

app.use(express.json())
app.use(cors())
app.use(criminalRoutes)

app.listen(3333, () => {
  console.log("Server running on port 3333.")
})
