const joi = require("joi");
//schema based 
// reg valid 
const registerSchema=joi.object({
    //todo 
    name:joi.string().min(3).max(20).required(),
    email:joi.string().email().required(),
    password:joi.string().min(6).required(),
    role: joi.string().valid('user', 'admin').default('user')
})

//login validatores
const loginSchema= joi.object({
    //todo 
    email:joi.string().email().required(),
    password:joi.string().min(6).required()
});

module.exports={
    registerSchema,
    loginSchema,
}
