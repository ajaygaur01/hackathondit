const mongoose  = require("mongoose")



const userschema = mongoose.Schema({
    email : {
        unique : true,
        type : String,
    },
    username : {
        unique : true,
        type : String,
    },
    password : {
        type : String,
    },
    fullname : {
        type : String,
    },
    skills : {
        type : String,
    },
    bio : {
        type : String,
    },
    desc : {
        type : String,
    },
    photo : {
        type : String,
    }
    
    
    
    
}, {timestamps : true})



module.exports = mongoose.models.user || mongoose.model("user", userschema);
