import mongoose from "mongoose";
import { config } from "dotenv";
import { userModel } from "./features/user/user.model";

config();

async function main() {
  await mongoose.connect(
    "mongodb+srv://thiagoAlves:123@cluster0.bbnwvtw.mongodb.net/DELTA_PDV_SYSTEM?retryWrites=true&w=majority&appName=Cluster0"
  );

  const user = new userModel({
    name: "messi",
    email: "messi@test.com",
    password: "1234567", // senha em texto puro
  });

  await user.save();
  console.log("Usuário criado com hash!");
  mongoose.disconnect();
}

main();
