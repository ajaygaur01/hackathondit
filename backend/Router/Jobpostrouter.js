const express = require("express")
const Job = require("../Models/Jobmodel.js")
const router = express.Router()
const multer  = require("multer")


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
          
const {jobrole ,skillsreq, joblocation, description , image} = await req.body
const newjobpost =  await new Job ({
    jobrole ,skillsreq, joblocation, description , image
})
await newjobpost.save()
res.status(201).json({
    message: 'jobpost submitted successfully!',
    data: newraise, // Replace with savedRaise if saving to DB
  });



        } catch (error) {
            console.log(error)
        }
        })





//Update//
router.put("/update/:id" , async (req , res) => {
    try {
        const updatepost = await Job.findByIdAndUpdate(req.params.id   , {$set : req.body} , {new:true})
        res.send(updatepost)
    } catch (error) {
        console.log(error)
    }
})


//delete//
router.delete("/delete/:id" , async (req , res) => {

try {
    await Job.findByIdAndDelete(req.params.id)
res.json("deleted")
} catch (error) {
    console.log(error)
}
}) 

//get all posts//

router.get("/allposts" , async (req , res) => {
    try {
        const allJobs = await Job.find()
        res.send(allJobs)
    } catch (error) {
        console.log(error)
    }
})

//get pstdetails//

router.get("/details/:id" , async (req , res) => {
    try {
        const jobdetails  = await Job.findById(req.params.id)
      res.send(jobdetails)
    } catch (error) {
        console.log(error)
    }
})

















module.exports = router