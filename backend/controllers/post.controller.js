import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import Notification from "../models/notification.model.js";
export const createPost = async (req, res) => {
    try {
        const {text} = req.body;
        let { img } = req.body;
        const userId = req.user._id.toString();

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if(!text && !img) {
            return res.status(400).json({ error: "Text & Img is required" });
        }

        if (img) {
            const uploadResponse = await cloudinary.uploader.upload(img, {
                upload_preset: "social_media",
            });
            img = uploadResponse.secure_url;
        }

        const newPost = await Post.create({
            user: userId,
            text,
            image: img,
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
        console.error("Error creating post:", error);
    }
}

export const likePost = async (req, res) => {
    try {
        const userId = req.user._id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        const isLiked = post.likes.includes(userId);
        if(isLiked){
            await Post.updateOne(
                { _id: postId },
                { $pull: { likes: userId } }
            );
            await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });
            res.status(200).json({message: "Post unliked successfully"})
        } else {
            post.likes.push(userId);
            await post.save();
            await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
            const notification = new Notification({
                from: userId,
                to: post.user,
                type: "like",
            })
            await notification.save();

            res.status(200).json({message: "Post liked successfully"})
        }
    } catch (error) {
        res.status(500).json({ error: "Server error" });
        console.error("Error liking post:", error);
        
    }
}

export const commentOnPost = async (req, res) => {
    try {
        const { text } = req.body;
        const userId = req.user._id;
        const postId = req.params.id;

        if(!text) {
            return res.status(400).json({ error: "Comment text is required" });
        }
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const comment = {
            user: userId,
            text,
        };
        post.comment.push(comment);
        await post.save();
        const notification = new Notification({
            from: userId,
            to: post.user,
            type: "comment",
        })
        await notification.save();
        res.status(201).json({ message: "Comment added successfully", comment });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
        console.error("Error commenting on post:", error);
        
    }
}


export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const userId = req.user._id.toString();

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (post.user.toString() !== userId) {
            return res.status(403).json({ error: "You are not authorized to delete this post" });
        }

        if (post.image) {
            const imgId = post.image.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imgId, { resource_type: "image" });
        }
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
        console.error("Error deleting post:", error);
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate({
            path: "user",
            select: "-password",
        })
        .populate({
            path: "comment.user",
            select: "-password",
            });

        if (posts.length === 0) {
            return res.status(404).json({ message: "No posts found" });
        }

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
        console.error("Error fetching posts:", error);
        
    }
}

export const getLikedPosts = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const likedPosts = await Post.find({ _id: { $in: user.likedPosts } })
        .populate({
            path: "user",
            select: "-password",
        }).populate({
            path: "comment.user",
            select: "-password",
        });

        if (likedPosts.length === 0) {
            return res.status(404).json({ message: "No liked posts found" });
        }
        res.status(200).json(likedPosts);

    } catch (error) {
        res.status(500).json({ error: "Server error" });
        console.error("Error fetching liked posts:", error);
        
    }
}

export const getfollowingPosts = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({error: "User not found"})
        }
        const following = user.following;

        const feedPosts = await Post.find({ user: { $in: following } })
        .sort({ createdAt: -1 }).populate({
            path: "user",
            select: "-password",
        }).populate({
            path: "comment.user",
            select: "-password",
        });
        // if (feedPosts.length === 0) {
        //     return res.status(200).json({ message: "No posts found" });
        // }
        res.status(200).json(feedPosts);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
        console.error("Error fetching following posts:", error);
        
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({error: "User not found"})
        }

        const posts = await Post.find({ user: user._id }).sort({ createdAt: -1 }).populate({
            path: "user",
            select: "-password",
        }).populate({
            path: "comment.user",
            select: "-password",
        });

        if (posts.length === 0) {
            return res.status(404).json({ message: "No posts found" });
        }

        res.status(200).json(posts);

    } catch (error) {
        res.status(500).json({ error: "Server error" });
        console.error("Error fetching user posts:", error);
        
    }
}