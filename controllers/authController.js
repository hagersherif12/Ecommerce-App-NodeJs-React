// user 
const User = require("../models/User");
// validatores 
const { registerSchema, loginSchema } = require("./validators/authValidatores");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register 
const register = async (req, res, next) => {
    try {
        // FIXED: Use 'error' not 'err'
        const { error, value } = registerSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });
        
        // if error in validation 
        if (error) {
            return res.status(400).json({
                msg: error.details.map((err) => err.message)
            });
        }

        // get data 
        const { name, email, password, role } = value;
        
        // if user exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists, please login" });
        }
        
        // hash password 
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // create user 
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "user"  // Default to 'user' if role not provided
        });
        
        // response
        return res.status(201).json({
            msg: "Account created successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        next(error);
    }
}

// login
const login = async (req, res, next) => {
    try {
        // FIXED: Use 'error' not 'err'
        const { error, value } = loginSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });
        
        // if error in validation 
        if (error) {
            return res.status(400).json({
                msg: error.details.map((err) => err.message)
            });
        }

        // get data from value
        const { email, password } = value;

        // check if user exists 
        const user = await User.findOne({ email });
        
        // if not 
        if (!user) {
            return res.status(400).json({ msg: "User doesn't exist, please create account first" });
        }
        
        // compare password
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(400).json({ msg: "Invalid password, try again" });
        }
        
        // generate token 
        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d"
        });

        // response 
        return res.status(200).json({
            msg: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        });

    } catch (error) {
        next(error);
    }
}

// logout 
const logout = async (req, res, next) => {
    try {
        return res.status(200).json({
            msg: "Logout successful"
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login,
    logout
}