import Users from "../models/user.model.js";
import ArchivedUsers from "../models/archivedProfile.model.js";
import { hashPass, verifyPass } from "../services/hashPassword.js";
import { sendPasswordResetSuccessMail } from "../services/mailer/mailer.js";

const updateProfile = async (req, res) => {
  const { username, fullname, image } = req.body;

  try {
    // Check if username is empty
    if (!username) {
      return res.status(400).json({ message: "Security token error" });
    }

    // Get user details
    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the fields only if they are provided
    if (fullname) {
      user.fullname = fullname;
    }
    if (image) {
      user.profilePic = image;
    }

    await user.save();

    const userPayload = {
      id: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      joined: user.createdAt,
    };

    return res
      .status(200)
      .json({ message: "Profile updated", user: userPayload });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updatePassword = async (req, res) => {
  const { username, password, newPassword } = req.body;

  try {
    if (!password || !newPassword || !username) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    // check if password matches
    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Security token error" });
    }

    const isPasswordCorrect = await verifyPass(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    //hash new password
    const newHashedPassword = await hashPass(newPassword);
    console.log(newHashedPassword);

    //save user
    user.password = newHashedPassword;
    await user.save();

    sendPasswordResetSuccessMail(user.fullname, user.email);

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ message: "Empty security token" });
    }
    //search user
    const user = await Users.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Security token error: User not found" });
    }

    //match password
    const isMatch = await verifyPass(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // delete user
    const result = await Users.deleteOne({ username });
    if (!result) {
      return res
        .status(500)
        .json({ message: "Internal server error: Cannot delete profile" });
    }

    const newArchivedUser = await ArchivedUsers.create({
      fullname: user.fullname,
      email: user.email,
      profilePic: user.profilePic,
      archivedDate: new Date(),
    });

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { updateProfile, updatePassword, deleteUser };
