import express, { Router } from "express";
import { config } from "dotenv";
import { connectToDataBase, mongoose } from "./config/DataBase";
import authRouter from "./routes/authRouter";
import unauthRouter from "./routes/unAuthRouter";

config();
connectToDataBase();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", authRouter);
app.use("/", unauthRouter);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/", (req, res) => {
  const mongoState = mongoose.connection.readyState; // 1 = conectado
  if (mongoState === 1) {
    res.status(200).json({ status: "UP", database: "connected" });
  } else {
    res.status(503).json({ status: "DOWN", database: "disconnected" });
    console.error("Erro ao conectar ao banco de dados"); // log simples
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
