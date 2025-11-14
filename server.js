const express = require("express")   // import express
const app = express()                // create app instance
const PORT = 3000                    // define port

app.use(express.json())              // middleware to parse JSON

// simple route
app.get("/", (req, res) => {
    res.json({
        firstName: "John",
        lastName: "Doe"
    })
})

// start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
