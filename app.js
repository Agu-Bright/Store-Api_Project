//imports

require('dotenv').config()
require('express-async-errors')


const connectDB = require('./db/connect.js')
const express = require('express');
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const mongoose = require('mongoose')
const app = express()
const productRoute = require('./routes/products')

//middlewares
app.use(express.json())

//route
app.get('/', (req, res)=>{
    res.send("<h1>Store API</h1> <a href = '/api/v1/products'>Products</a>" )
})
app.use('/api/v1/products', productRoute )

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000
const MONGO_URI = 'mongodb+srv://Bright:Xpretion12@cluster0.xvkpb.mongodb.net/store-API?retryWrites=true&w=majority'

const start = async()=>{
    try {
        await mongoose.connect("mongodb+srv://store-API:Xpretion12@cluster0.xvkpb.mongodb.net/API?retryWrites=true&w=majority")
        app.listen(port, ()=>{console.log(`Server is listening on ${port}`)})
    } catch (error) {
        console.log("BIG FAT ERROR");
    }
}

start()