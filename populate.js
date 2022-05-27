require('dotenv').config()


const jsonProducts = require('./product.json')
const mongoose = require('mongoose')
const product = require('./models/product')




const start = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://store-API:Xpretion12@cluster0.xvkpb.mongodb.net/API?retryWrites=true&w=majority")
        await product.deleteMany()
        await product.create(jsonProducts)
        console.log("success")
        process.exit(0)
    } catch (error) {
        console.log("success");
        process.exit(1)
    }
}
start()