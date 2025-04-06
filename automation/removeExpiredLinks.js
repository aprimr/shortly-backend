import cron from "node-cron";
import Urls from "../models/url.model.js";

const removeExpiredLinks = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      const deletedLinks = await Urls.deleteMany({
        expiryDate: { $lt: new Date() },
      });

      console.log(`Deleted ${deletedLinks.deletedCount} expired links.`);
    } catch (error) {
      console.error("Error deleting expired links:", error);
    }
  });
};

export default removeExpiredLinks;
