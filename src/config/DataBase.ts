import mongoose from "mongoose";
import { config } from "dotenv";
import { logger } from "../utils/logger";

config();
export async function connectToDataBase(): Promise<void> {
  const dbUri = process.env.MONGO_URI;

  if (!dbUri) throw new Error("Database URI não definida no .env");
  if (mongoose.connection.readyState === 1) return;

  try {
    await mongoose.connect(dbUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    logger.info("Database connected!!");
  } catch (error: any) {
    logger.error("Erro na conexão:", error.message);
    setTimeout(() => connectToDataBase(), 5000);
  }
}

// export mongoose itself para health check
export { mongoose };
