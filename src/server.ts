import express, { Router } from "express";
import { config } from "dotenv";
import { db } from "./config/DataBase";
import authRouter from "./routes/AuthRouter";

config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("api", authRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
