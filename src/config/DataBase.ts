import mongoose, { mongo } from "mongoose";
import { config } from "dotenv";
import { promises } from "dns";
import { logger } from "../logger";
import { unknown } from "zod";

config();

class DataBase {
  private static instance: DataBase;
  private dbUri: string;

  private constructor() {
    if (!process.env.MONGO_URI) {
      throw new Error("Connection string is not defined");
    }
    this.dbUri = process.env.MONGO_URI;
    this.connect();
  }

  static getInstance(): DataBase {
    if (!DataBase.instance) {
      DataBase.instance = new DataBase();
    }
    return DataBase.instance;
  }

  async connect(): Promise<void> {
    try {
      await mongoose.connect(this.dbUri);
      logger.info("connected to MongoDB!");

      mongoose.connection.on("Disconnectes", () => {
        logger.warn("disconnected. tryng reconnect...");
      });

      mongoose.connection.on("error", (error) => {
        logger.error("Was not possible to connect to MongoDb");
      });
    } catch (error: any) {
      logger.error("Was not possible to connecto to database!", error);
    }
  }
  async disconect(): Promise<void> {
    await mongoose.disconnect();
    logger.info("Disconnected to MongoDB");
  }
}

export const db = DataBase.getInstance();
