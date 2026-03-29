// middleware to verification 
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({ msg: "Token required" });
        }
        
        // Split raw token
        const token = authHeader.split(" ")[1];
        
        // Verify token
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        //  Use findById instead of findOne
        const user = await User.findById(payload.id).select("-password");
        
        if (!user) {
            return res.status(401).json({ msg: "User not found" });
        }
        
        req.user = user;
        next();
        
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

// Admin middleware
const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as admin' });
    }
};

// Export both middlewares
module.exports = { authMiddleware, adminMiddleware };