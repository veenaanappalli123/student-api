import express from "express"
import userRoutes from "./routes/userRoutes.js"
import { initializeDatabase } from "./config/database.js"

const app = express()
const PORT = 3000

// Initialize database
initializeDatabase()

// Global middleware
app.use(express.json())

// Mount routes
app.use("/users", userRoutes)

// Welcome route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
    endpoints: { users: "/users" }
  })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log("Database ready")
})
