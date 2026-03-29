// call mongoose
const mongoose = require("mongoose")

// create schema
/*id
name
description
createdAt

 */

const categorySchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    }
},{timestamps:true})
// create moddel 
const Category = mongoose.model("Category",categorySchema);
// export module
module.exports= Category 