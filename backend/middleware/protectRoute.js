import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; // Assuming you're using cookies to store the JWT
        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No Tokken provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({ error: "Unauthorized: Invalid Tokken" });
        }

        const user = await User.findById(decoded.userId).select("-password"); // Exclude password from the response
        if(!user) {
            return res.status(401).json({ error: "Unauthorized: User not found" });
        }
        req.user = user; // Attach user to request object for further use in the route handler
        next(); // Call next middleware or route handler
    } catch (error) {
        console.error("Error during authentication:", error);
        res.status(500).json({ error: "Server error" });
        
    }
}