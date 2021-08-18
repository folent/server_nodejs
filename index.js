require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const serverRouter = require('./serverRouter')
const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use("/api", serverRouter)
const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()