import express from "express";
import {
  getUrls,
  shortUrl,
  deleteUrl,
  getUrlById,
} from "../controllers/url.controllers.js";

const router = express.Router();

router.post("/short-url", shortUrl);
router.get("/get-urls", getUrls);
router.delete("/delete-url", deleteUrl);
router.get("/data/:shortId", getUrlById);

export default router;
