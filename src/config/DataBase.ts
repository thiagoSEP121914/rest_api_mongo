import mongoose, { mongo } from "mongoose";
import { config } from "dotenv";
import { logger } from "../utils/logger";

config();

async function connectToDataBase(): Promise<void> {
  const dbUri = process.env.MONGO_URI;

  if (!dbUri) throw new Error("Database URI não definida no .env");

  if (mongoose.connection.readyState !== 0) return;

  try {
    await mongoose.connect(dbUri);
    logger.info("Data base connected!!");
  } catch (error: any) {
    logger.error("Was not possible to connect to MongoDB", error);
    setTimeout(() => connectToDataBase(), 5000);
  }
}

export const db = connectToDataBase();
