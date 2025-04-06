import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {
  accountVerifiedMessageTemplate,
  newLoginMailTemplate,
  passwordChangedMessageTemplate,
  passwordResetMailTemplate,
  verificationMailTemplate,
} from "./mailTemplate.js";

dotenv.config();
const user = process.env.EMAIL;
const pass = process.env.PASS;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user,
    pass,
  },
});

// Verification Code Mail
async function sendVerificationCode(fullname, email, verificationCode) {
  const verificationMail = verificationMailTemplate(fullname, verificationCode);
  const info = await transporter.sendMail({
    from: user,
    to: email,
    subject: "Account Verification Code From Shortly",
    text: verificationMail,
    html: verificationMail,
  });
}

// New Login Mail
async function sendNewLoginMail(fullname, email, reqDetails) {
  const newLoginMail = newLoginMailTemplate(fullname, reqDetails);
  const info = await transporter.sendMail({
    from: user,
    to: email,
    subject: "New Login Attempt to Your Shortly Account",
    text: newLoginMail,
    html: newLoginMail,
  });
}

// Password Reset Code Mail
async function sendPasswordResetMail(fullname, email, verificationCode) {
  const passwordResetMail = passwordResetMailTemplate(
    fullname,
    verificationCode
  );
  const info = await transporter.sendMail({
    from: user,
    to: email,
    subject: "Password Reset Request From Your Shortly Account",
    text: passwordResetMail,
    html: passwordResetMail,
  });
}

// Password Reset Successful Mail
async function sendPasswordResetSuccessMail(fullname, email) {
  const passwordResetSuccessMail = passwordChangedMessageTemplate(fullname);
  const info = await transporter.sendMail({
    from: user,
    to: email,
    subject: "Password Reset Successful",
    text: passwordResetSuccessMail,
    html: passwordResetSuccessMail,
  });
}

// Account Verified Mail
async function sendAccountVerifiedMail(fullname, email) {
  const accountVerifiedMail = accountVerifiedMessageTemplate(fullname);
  const info = await transporter.sendMail({
    from: user,
    to: email,
    subject: "Account verified successful",
    text: accountVerifiedMail,
    html: accountVerifiedMail,
  });
}

export {
  sendVerificationCode,
  sendNewLoginMail,
  sendPasswordResetMail,
  sendPasswordResetSuccessMail,
  sendAccountVerifiedMail,
};
