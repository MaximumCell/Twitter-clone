import jwt from "jsonwebtoken";

export const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });
    res.cookie("jwt", token, {
        httpOnly: true, // This flag helps to prevent XSS attacks by restricting access to the cookie from JavaScript
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", // Helps to prevent CSRF attacks
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    });
}