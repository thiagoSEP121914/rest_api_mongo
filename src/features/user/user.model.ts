import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import { config } from "dotenv";

config();
export interface IUser {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updateAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface UserDocument extends IUser, Document {}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this as UserDocument;

  if (!user.isModified("password")) {
    return next();
  }

  const saltRounds = Number(process.env.SALT) || 10; // fallback seguro
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;

  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this.user as UserDocument;
  return bcrypt
    .compare(candidatePassword, user.password)
    .catch((error) => false);
};

const userModel = mongoose.model("User", userSchema);
