import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { commentOnPost, createPost, deletePost, getAllPosts, getfollowingPosts, getLikedPosts, getUserPosts, likePost } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/all", protectRoute, getAllPosts);
router.get("/following", protectRoute, getfollowingPosts);
router.get("/users/:username", protectRoute, getUserPosts);
router.get("/likes/:id", protectRoute, getLikedPosts);
router.post("/create",protectRoute, createPost);
router.post("/like/:id",protectRoute, likePost);
router.post("/comment/:id",protectRoute, commentOnPost);
router.delete("/:id",protectRoute, deletePost);

export default router;