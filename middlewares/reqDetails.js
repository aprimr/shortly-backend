import axios from "axios";

const logReqDetails = async (req, res, next) => {
  // Get IP address (considering proxy headers)
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.ip ||
    req.connection.remoteAddress;

  // Get user agent
  const userAgent = req.headers["user-agent"];

  // Get timestamp in Kathmandu timezone
  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kathmandu",
  });

  // Detect device type
  let deviceInfo = "Unknown device";

  if (/Android/i.test(userAgent)) {
    deviceInfo = "Android";
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    deviceInfo = "iOS (iPhone/iPad)";
  } else if (/Macintosh|Mac OS X/i.test(userAgent)) {
    deviceInfo = "Mac";
  } else if (/Windows/i.test(userAgent)) {
    deviceInfo = "Windows PC";
  } else if (/Linux/i.test(userAgent)) {
    deviceInfo = "Linux PC";
  }

  // Fetch Location
  let location = "Unknown location";
  try {
    const response = await axios.get(
      `https://ipinfo.io/${process.env.IP_INFOIP}/json?token=0c9d8a53e2f7b5`
    );
    if (response.data) {
      const { city, region, country } = response.data;
      location = `${city}, ${region}, ${country}`;
    }
  } catch (error) {
    console.error("Error fetching location:", error.message);
  }

  // Attach details to request object
  req.reqDetails = {
    ip,
    location,
    timestamp,
    device: deviceInfo,
  };

  next();
};

export default logReqDetails;
