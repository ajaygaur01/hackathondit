const express = require("express")
const app =  express()
const mongoose  = require("mongoose")
const bodyparser = require("body-parser")
const cors = require("cors")
const jobrouter = require("../backend/Router/Jobpostrouter.js")
const userrouter = require("../backend/Router/userrouter.js")

app.use(bodyparser.json())
app.use(cors())



app.use("/job" , jobrouter)
app.use("/user" , userrouter)






try {
    mongoose.connect("mongodb+srv://devanshsharma1303:devanshsharma1303@cluster0.boy14.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log("db connected")
} catch (error) {
    console.log(error)
}





app.listen(8080 , () => {
    console.log("server running")
})