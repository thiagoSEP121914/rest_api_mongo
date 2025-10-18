import jwt from "jsonwebtoken";
import UserService from "../user/UserService";
import { UserDocument } from "../user/user.model";
import UserRepository from "../user/UserRepository";

interface IloginResponse {
  token: string;
}

export default class LoginService {
  private userService: UserService;
  private SECRET_KEY: string;

  constructor(userService: UserService) {
    this.userService = userService;
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT não foi definida");
    }
    this.SECRET_KEY = process.env.JWT_SECRET;
  }

  async validateLogin(
    email: string,
    password: string
  ): Promise<IloginResponse> {
    const user: UserDocument | null = await this.userService.findByEmail(email);

    if (!user) throw new Error("Usuário não encontrado");

    const isValid = await user.comparePassword(password);

    if (!isValid) throw new Error("Senha incorreta");

    const token = jwt.sign(
      { id: user._id, email: user.email }, // payload
      this.SECRET_KEY,
      { expiresIn: "1h" }
    );

    return { token };
  }
}
