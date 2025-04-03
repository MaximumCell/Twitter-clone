import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { followUser, getUserProfile, getUserSuggestions, updateUserProfile } from "../controllers/user.controller.js";

const router = express.Router();
router.get("/profile/:username", protectRoute,getUserProfile);
router.get("/suggestions", protectRoute,getUserSuggestions);
router.post("/follow/:id", protectRoute,followUser);
router.post("/update",protectRoute,updateUserProfile);

export default router;