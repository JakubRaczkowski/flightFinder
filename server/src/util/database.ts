import mongoose from "mongoose";
import { config } from "dotenv";
import { log } from "console";
config();

const db = mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@flighfinder.ojqbi5a.mongodb.net/flights?retryWrites=true&w=majority`
);

export default db;


