const mongoose  = require("mongoose")



const jobschema = mongoose.Schema({
    jobrole : {
        required : true,
        unique : true,
        type : String,
    },
    skillsreq : {
        required : true,
        type : String,
    },
    joblocation : {
        required : true,
        type : String,
    },
    description : {
        required : true,
        type : String,
    },
    image : {
        type : String
    }
    
    
    
    
}, {timestamps : true})



module.exports = mongoose.model("user" , jobschema)