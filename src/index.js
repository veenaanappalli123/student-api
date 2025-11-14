
import { logMiddleware } from "./middleware/middleware.js"

import express from "express"
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)) // workaround for fetch in Node
const app = express()
const PORT = 3000

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "Dave" },
]

app.use(express.json())

// middleware to log and fetch external data
app.use(async (req, res, next) => {
  const date = new Date().toISOString()
  console.log(`[${date}] ${req.method} ${req.url}`)

  const response = await fetch("https://jsonplaceholder.typicode.com/users/1")
  const data = await response.json()
  req.data = data

  next()
})

app.get("/", logMiddleware, (req, res) => {
  res.json(users)
})


app.post("/", (req, res) => {
  console.log(req.body)
  res.send("POST received")
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
