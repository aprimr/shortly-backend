import Users from "../models/user.model.js";
import cretaeUsername from "../services/createUsername.js";
import {
  generateVerificationCode,
  generateVerificationCodeExpiration,
} from "../services/verificationCode.js";
import { hashPass, verifyPass } from "../services/hashPassword.js";
import {
  sendAccountVerifiedMail,
  sendNewLoginMail,
  sendPasswordResetMail,
  sendPasswordResetSuccessMail,
  sendVerificationCode,
} from "../services/mailer/mailer.js";
import { signJwt } from "../services/jwt.js";
import { urlencoded } from "express";

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    //check for empty fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill in all fields",
      });
    }
    //check if user exists
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //verify password
    const hashedPassword = user.password;
    const isMatch = await verifyPass(password, hashedPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //check if user is verified
    if (user.isVerified === false) {
      return res.status(400).json({ message: "Please verify your account" });
    }

    const jwtPayload = {
      id: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      joined: user.createdAt,
    };

    //sign jwt
    const token = signJwt(jwtPayload);

    //Req Details
    const reqDetails = req.reqDetails;

    //Send new login mail
    sendNewLoginMail(user.fullname, user.email, reqDetails);

    return res.status(200).json({
      message: "Login successfully",
      user: jwtPayload,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

const userSignup = async (req, res) => {
  const { fullname, email, password } = req.body;
  const username = cretaeUsername();
  try {
    // check for empty fields
    if (!username || !fullname || !email || !password) {
      return res.status(400).json({
        message: "Please fill in all fields",
      });
    }

    // check if username already exists
    const userExists = await Users.findOne({ username });
    if (userExists) {
      return res.status(500).json({
        message: "Internal server error: Generated username already exists",
      });
    }
    // check if user already exists
    const emailExists = await Users.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    //hash password
    const hashedPassword = await hashPass(password);

    // send otp email
    const verificationCode = generateVerificationCode();
    const verificationCodeExpiration = generateVerificationCodeExpiration();
    sendVerificationCode(fullname, email, verificationCode);

    // create user
    const newUser = await Users.create({
      fullname,
      username,
      email,
      password: hashedPassword,
      verificationCode,
      verificationCodeExpiration,
    });

    if (!newUser) {
      return res.status(400).json({
        message: "User not created",
      });
    }

    return res.status(200).json({
      message: "Signup successful",
    });
  } catch (err) {
    console.log(errror);
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    //check for empty fields
    if (!email || !otp) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    //get user from db if otp match
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    //validate otp
    if (
      otp != user.verificationCode ||
      Date.now() > user.verificationCodeExpiration
    ) {
      return res.status(400).json({ message: "Invalid or Expired OTP" });
    }
    //update user
    user.verificationCode = null;
    user.verificationCodeExpiration = null;
    user.isVerified = true;
    await user.save();

    // Send mail
    const fullname = user.fullname;
    sendAccountVerifiedMail(fullname, email);

    return res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    console.log(error);
  }
};

const verifyAccount = async (req, res) => {
  const { email } = req.body;
  try {
    //check for empty fields
    if (!email) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    //get user from db
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User is not registered" });
    }
    const fullname = urlencoded.fullname;
    //check if user is verified
    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verfifed" });
    }

    //send otp email
    const verificationCode = generateVerificationCode();
    const verificationCodeExpiration = generateVerificationCodeExpiration();
    sendVerificationCode(fullname, email, verificationCode);

    //update user
    user.verificationCode = verificationCode;
    user.verificationCodeExpiration = verificationCodeExpiration;
    await user.save();

    return res
      .status(200)
      .json({ message: "User account verification code sent successfully" });
  } catch (error) {
    console.log(error);
  }
};

const verifyEmail = async (req, res) => {
  const { email } = req.body;
  try {
    //check for empty field
    if (!email) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    //find user in db
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User is not registered" });
    }
    //check if user is verified
    if (!user.isVerified) {
      return res.status(400).json({ message: "User not verified" });
    }

    //send otp email
    const fullname = user.fullname;
    const resetPasswordCode = generateVerificationCode();
    const resetPasswordCodeExpiration = generateVerificationCodeExpiration();
    sendPasswordResetMail(fullname, email, resetPasswordCode);

    //update user
    user.resetPasswordCode = resetPasswordCode;
    user.resetPasswordCodeExpiration = resetPasswordCodeExpiration;
    await user.save();

    return res.status(200).json({ message: "Email verified" });
  } catch (error) {
    console.log(error);
  }
};

const verifyResetPasswordCode = async (req, res) => {
  const { email, otp } = req.body;
  try {
    //check for empty fields
    if (!otp) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    //get user from db if otp match
    const user = await Users.findOne({ email });

    //validate otp
    if (
      otp != user.resetPasswordCode ||
      Date.now() > user.resetPasswordCodeExpiration
    ) {
      return res.status(400).json({ message: "Invalid or Expired OTP" });
    }
    //update user
    user.resetPasswordCode = null;
    user.resetPasswordCodeExpiration = null;
    await user.save();

    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.log(error);
  }
};

const updatePassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    //check for empty fields
    if (!password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    //get user from db if otp match
    const user = await Users.findOne({ email });

    //check if previous password matches with current
    const isMatch = await verifyPass(password, user.password);
    if (isMatch) {
      return res
        .status(400)
        .json({ message: "New password must be different" });
    }

    user.password = await hashPass(password);
    user.save();

    //send email
    const fullname = user.fullname;
    sendPasswordResetSuccessMail(fullname, email);

    return res.status(200).json({ message: "Password changed" });
  } catch (error) {
    console.log(error);
  }
};

export {
  userLogin,
  userSignup,
  verifyOtp,
  verifyAccount,
  verifyEmail,
  verifyResetPasswordCode,
  updatePassword,
};
