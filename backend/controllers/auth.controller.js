import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import  {generateToken}  from "../libs/utills/generateToken.js";
export const signup = async (req, res) => {
  try {
    const { username, fullname, password, email } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    if(password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }
    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      fullname,
      password: hashedPassword,
      email,
    });

    if (newUser) {
      generateToken(res, newUser._id);
      await newUser.save();
      res
        .status(201)
        .json({
          _id: newUser._id,
          username: newUser.username,
          fullname: newUser.fullname,
          email: newUser.email,
          profileImg: newUser.profileImg,
          coverImg: newUser.coverImg,
          followers: newUser.followers,
          following: newUser.following,
          link: newUser.link,
        });
    }
    else {
        res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user.password || "");

        if (!user || !isPasswordCorrect ) {
            return res.status(400).json({error: "Invalid username or password"})
        }

        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            username: user.username,
            fullname: user.fullname,
            email: user.email,
            profileImg: user.profileImg,
            coverImg: user.coverImg,
            followers: user.followers,
            following: user.following,
            link: user.link,
        });
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ error: "Server error" });
        
    }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};


export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password"); // Exclude password from the response
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ user});
    } catch (error) {
        console.error("Error fetching user data:", error.message);
        res.status(500).json({ error: "Server error" });
    }
}