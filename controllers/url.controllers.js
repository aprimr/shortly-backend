import generateId from "../services/generateId.js";
import Urls from "../models/url.model.js";
import Users from "../models/user.model.js";
import { ObjectId } from "mongodb";

const shortUrl = async (req, res) => {
  const { username, longUrl, customId, expiresOn } = req.body;
  try {
    // Check for empty fields
    if (!longUrl) {
      return res.status(400).json({ message: "Long URL is required" });
    }

    //Check for usernaem
    if (!username) {
      return res.status(400).json({ message: "Security token error" });
    }

    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(300).json({ message: "Security token error" });
    }

    // Check if custom ID already exists
    if (customId) {
      const isMatch = await Urls.findOne({ shortId: customId });
      if (isMatch) {
        return res
          .status(400)
          .json({ message: "Custom short id already exists" });
      }
    }

    // Generate a short ID if no custom ID is provided
    let shortId = customId || generateId();
    let expiryDate = expiresOn || null;

    const newUrl = await Urls.create({
      username,
      longUrl,
      shortId,
      expiryDate,
    });

    if (!newUrl) {
      return res.status(500).json({ message: "Server error" });
    }

    return res.status(200).json({ longUrl, shortId });
  } catch (error) {
    console.error("Error in shortUrl:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUrls = async (req, res) => {
  const { username } = req.query;
  try {
    //Check for usernaem
    if (!username) {
      return res.status(400).json({ message: "Security token error" });
    }

    const user = await Users.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Security token error: User not found" });
    }

    //get urls
    const urls = await Urls.find({ username });

    return res.status(200).json({ message: "Fetched", urls });
  } catch (error) {
    console.log(error);
  }
};

const deleteUrl = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    if (!id) return res.status(400).json({ message: "ID is required" });

    const result = await Urls.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "URL not found" });
    }

    return res.status(200).json({ message: "URL deleted" });
  } catch (error) {
    console.log(error);
  }
};

const getUrlById = async (req, res) => {
  const { shortId } = req.params;
  try {
    const urlDetails = await Urls.findOne({ shortId });
    if (!urlDetails) {
      return res.status(404).json({ message: "URL not found" });
    }
    urlDetails.clicks++;
    urlDetails.save();
    return res.status(200).json({ message: "Fetched", urlDetails });
  } catch (error) {
    console.log("Internal server error: " + error);
  }
};

export { shortUrl, getUrls, deleteUrl, getUrlById };
