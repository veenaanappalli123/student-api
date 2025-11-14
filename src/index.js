import express from "express"
import userRoutes from "./routes/userRoutes.js"

const app = express()
const PORT = 3000

// Global middleware
app.use(express.json())

// Mount the user router at /users
app.use("/users", userRoutes)

// Optional welcome route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
    endpoints: {
      users: "/users"
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  console.log("API Documentation:")
  console.log("  GET    /users      - Get all users")
  console.log("  GET    /users/:id  - Get user by ID")
  console.log("  POST   /users      - Create new user")
  console.log("  PUT    /users/:id  - Update user")
  console.log("  DELETE /users/:id  - Delete user")
})
