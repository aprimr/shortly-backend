import express from "express";
import {
  updatePassword,
  updateProfile,
  deleteUser,
} from "../controllers/profile.controllers.js";

const router = express.Router();

router.put("/update-profile", updateProfile);
router.put("/update-password", updatePassword);
router.delete("/user", deleteUser);

export default router;
