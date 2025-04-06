import express from "express";
import {
  userLogin,
  userSignup,
  verifyOtp,
  verifyAccount,
  verifyEmail,
  verifyResetPasswordCode,
  updatePassword,
} from "../controllers/auth.controllers.js";
import logReqDetails from "../middlewares/reqDetails.js";

const router = express.Router();

//auth endpoints
router.post("/login", logReqDetails, userLogin);
router.post("/signup", userSignup);
router.post("/verify-otp", verifyOtp);

//verify account endpoint
router.post("/verify-account", verifyAccount);

//password reset endpoints
router.post("/verify-email", verifyEmail);
router.post("/verify-reset-pass-otp", verifyResetPasswordCode);
router.post("/update-password", updatePassword);

export default router;
