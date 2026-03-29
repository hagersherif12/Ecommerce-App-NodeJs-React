const  mongoose  = require("mongoose")

async function dbConnect  () {
   try {
     await mongoose.connect(process.env.DB_URL)

    console.log("DB connected succesfully ");
    
   } catch (error) {
    console.log(error)
    
   }
     
}

module.exports={dbConnect}