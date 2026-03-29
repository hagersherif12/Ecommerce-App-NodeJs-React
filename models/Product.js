// call mongoose
const mongoose = require("mongoose")

// create schema
/*d
name
description
price
image
categoryId
createdBy
createdAt
Relationship example:
Category (1) -------- (Many) Products
User (1) -------- (Many) Products

 */

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
       ref:"Category",
        required:true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
       ref:"User",
        required:true
    }
},{timestamps:true})
// create moddel 
const Product = mongoose.model("Product",productSchema);
// export module
module.exports= Product 