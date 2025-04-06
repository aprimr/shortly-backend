import mongoose from "mongoose";

const archivedProfileSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    profilePic: {
      type: String,
      required: true,
      default: null,
    },
    archivedDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const ArchivedUsers = mongoose.model("ArchivedProfiles", archivedProfileSchema);

export default ArchivedUsers;
