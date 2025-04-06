import mongoose from "mongoose";

const urlSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    longUrl: {
      type: String,
      required: true,
    },
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    clicks: {
      type: String,
      default: 0,
    },
    expiryDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Urls = mongoose.model("Urls", urlSchema);
export default Urls;
