import cron from "node-cron";
import Users from "../models/user.model.js";

const removeUnverifiedUsers = () => {
  cron.schedule("*/1 * * * *", async () => {
    console.log("Checking for unverified users.");

    try {
      const deletedUsers = await Users.deleteMany({
        isVerified: false,
        createdAt: { $lte: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) },
      });

      console.log(`Deleted ${deletedUsers.deletedCount} unverified users.`);
    } catch (error) {
      console.error("Error deleting unverified users:", error);
    }
  });
};

export default removeUnverifiedUsers;
