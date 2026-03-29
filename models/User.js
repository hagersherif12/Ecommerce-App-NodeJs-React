// call mongoose
const mongoose = require("mongoose")

// create schema
/*id
name
email
password
role
createdAt
Roles may include:
admin
user
 */

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum: ["admin", "user"],
        default: "user",
    }
},{timestamps:true})
// create moddel 
const User = mongoose.model("User",userSchema);
// export module
module.exports= User 