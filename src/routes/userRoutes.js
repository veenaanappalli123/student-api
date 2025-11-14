import express from "express"
import { logMiddleware } from "../middleware/middleware.js"
import * as userController from "../controllers/userController.js"

// Create a router instance
const router = express.Router()

// Define routes
router.get("/", logMiddleware, userController.getAllUsers)   // GET /users
router.get("/:id", userController.getUserById)               // GET /users/:id
router.post("/", userController.createUser)                  // POST /users
router.put("/:id", userController.updateUser)                // PUT /users/:id
router.delete("/:id", userController.deleteUser)             // DELETE /users/:id

// Export the router
export default router
