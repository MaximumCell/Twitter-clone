import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import Notification from "../models/notification.model.js";
export const getUserProfile = async (req, res) => {
  const { username } = req.params; // Extract username from request parameters
  try {
    // Find user by username and populate followers and following fields
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch {
    console.error("Error fetching user profile:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
export const getUserSuggestions = async (req, res) => {
  try {
    const userId = req.user._id;
    const userfollowing = await User.findById(userId).select("following");

    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: userId, $nin: userfollowing.following },
        },
      },
      {
        $sample: { size: 10 }, // Randomly select 5 users
      },
    ]);

    const filteredUsers = users.filter(user => !userfollowing.following.includes(user._id));
    const suggestedUsers = filteredUsers.slice(0, 5); // Limit to 5 suggestions

    suggestedUsers.forEach(user => user.password = null); // Remove password from each user object
    res.status(200).json({ suggestedUsers });
  } catch (error) {
    console.error("Error fetching user suggestions:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const followUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id.toString()) {
      return res.status(400).json({ error: "You can't follow yourself" });
    }

    if (!userToModify || !currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      await User.findByIdAndUpdate(
        id,
        { $pull: { followers: req.user._id } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { following: id } },
        { new: true }
      );

      res.status(200).json({ message: "Unfollowed successfully" });
    } else {
      await User.findByIdAndUpdate(
        id,
        { $push: { followers: req.user._id } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        req.user._id,
        { $push: { following: id } },
        { new: true }
      );
      const newNotification = new Notification({
        type: "follow",
        from: req.user._id,
        to: userToModify._id,
      });
      await newNotification.save();
      res.status(200).json({ message: "User followed sucessfully" });
    }
  } catch (error) {
    console.error("Error following/unfollowing user:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateUserProfile = async (req, res) => {
    const {fullname, email, username, currentPassword, newPassword, bio, link} = req.body;
    let {profileImg, coverImg} = req.body;
    
    try {
        let user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if ((!newPassword && currentPassword) || (newPassword && !currentPassword)) {
            return res.status(400).json({ error: "Both current and new passwords are required" });
        }
        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword , user.password);
            if (!isMatch) {
                return res.status(401).json({ error: "Current password is incorrect" });
            }
            if (newPassword.length < 6) {
                return res.status(400).json({ error: "New password must be at least 6 characters long" });
            }
            user.password = await bcrypt.hash(newPassword, salt);
        }
        if(profileImg) {
            if(user.profileImg) {
                await cloudinary.uploader.destroy(user.profileImg.split('/').pop().split('.')[0]);
            }
            const uploadres = await cloudinary.uploader.upload(profileImg);
            profileImg = uploadres.secure_url;

        }
        if(coverImg) {
            if(user.coverImg) {
                await cloudinary.uploader.destroy(user.coverImg.split('/').pop().split('.')[0]);
            }
            const uploadres = await cloudinary.uploader.upload(coverImg);
            coverImg = uploadres.secure_url;
        }

        user.fullname = fullname || user.fullname;
        user.email = email || user.email;
        user.username = username || user.username;
        user.bio = bio || user.bio;
        user.link = link || user.link;
        user.profileImg = profileImg || user.profileImg;
        user.coverImg = coverImg || user.coverImg;

        
        user = await user.save();
        user.password = null; // Remove password before sending response
        
        res.status(200).json({ user });
        
} catch (error) {
        console.error("Error updating user profile:", error.message);
        res.status(500).json({ error: "Server error" });
    }
}
