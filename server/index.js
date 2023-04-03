const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const paymentRoutes = require('./routes/payment');

// app initlization
const app = express()

// environment variables
dotenv.config()

// middlewares
app.use(express.json())
app.use(cors())


// routes
app.use("/api/payment", paymentRoutes)

const port = process.env.PORT || 8080
app.listen(port, ()=> {
    console.log(`Listning to port ${port}`);
})

