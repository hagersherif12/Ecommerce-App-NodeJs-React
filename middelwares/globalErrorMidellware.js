
const errorMiddelware = (err,req,res,next)=>{
    return res.status(500).json({
         msg:"server error "
        })
}

module.exports = {errorMiddelware};