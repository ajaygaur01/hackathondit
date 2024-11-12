const express  = require("express")
const router = express.Router();
const User = require("../Models/Usermodel.js")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const multer = require("multer")
// register//

router.post("/register"  , async (req , res) => {

try {
    const {email , password , username , fullname}  =  req.body
    console.log(req.body)
const salt =  await bcrypt.genSalt(10);
const hashedpassword = await bcrypt.hash(password , salt)

const newuser = await new User({
    email,
    password : hashedpassword,
    username,
    fullname
})

  newuser.save()
 res.send(newuser)

} catch (error) {
    console.log(error)
}
})



// lOGIN//

router.post("/login" , async (req , res) => {

try {
    const dbemail  = await User.findOne({email : req.body.email})
    if(!dbemail) {
        res.json("email doesnot exist")
        console.log("email doesnot exist")
    }
    const compared =await  bcrypt.compare(req.body.password , dbemail.password)
if(!compared) {
    console.log("email password does not match")
    res.json("email password does not match")
    
}

const token = jwt.sign({_id : User._id , email :User.email , email: User.email }   , "secretkeyfortest"   , {expiresIn : "7d"} )
const {password , ...info} = dbemail._doc
res.cookie("token" , token).json(info)
console.log("login success")
} catch (error) {
    console.log(error)
}
})


// logout//

router.post("/logout" , async  (req , res) => {
try {
    res.clearCookie("token")
    res.json("successfully logout")
    console.log("logout")
} catch (error) {
    console.log(error)
}
})






//create//

const storage = multer.diskStorage({
    destination : function(req , file , cb) {
    return cb(null , "./public/images")
    },
    filename : function (req , file , cb) {
        return cb(null , `${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({storage})

    router.post("/create"   , upload.single('file') ,  async (req , res) => {
        try {
            const filePath = req.file ? req.file.path : null;
          
const {desc , skills , bio , photo} = await req.body
const newabout =  await new About ({
    skills,
    bio,
    desc,
    photo : filePath
})
await newabout.save()
res.status(201).json({
    message: 'about set successfully!',
    data: newraise, // Replace with savedRaise if saving to DB
  });
        } catch (error) {
            console.log(error)
        }
        })





//Update//
router.put("/update/:id" , async (req , res) => {
    try {
        const updateabout = await About.findByIdAndUpdate(req.params.id   , {$set : req.body} , {new:true})
        res.send(updateabout)
    } catch (error) {
        console.log(error)
    }
})


//delete//
router.delete("/delete/:id" , async (req , res) => {

try {
    await About.findByIdAndDelete(req.params.id)
res.json("deleted")
} catch (error) {
    console.log(error)
}
}) 


//get pstdetails//

router.get("/details/:id" , async (req , res) => {
    try {
        const aboutdetails  = await About.findById(req.params.id)
      res.send(aboutdetails)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router