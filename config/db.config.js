import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const ConnectToDB = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default ConnectToDB;
