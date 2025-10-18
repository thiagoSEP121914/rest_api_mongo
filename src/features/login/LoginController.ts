import { Router, Request, Response } from "express";
import { AbstractController } from "../../core/AbstractController";
import { ILogin, loginSchema } from "./login.schema";
import LoginService from "./LoginService";
import UserService from "../user/UserService";
import UserRepository from "../user/UserRepository";
import { StatusCodes } from "http-status-codes";
import ProductController from "../products/ProductController";

class LoginController extends AbstractController {
  private loginService: LoginService;

  constructor() {
    super();
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    this.loginService = new LoginService(userService);
  }

  handle(): Router {
    this.route.post("/", async (req: Request, res: Response) => {
      const result = loginSchema.safeParse(req.body);

      if (!result.success) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: result.error.format() });
      }

      const loginData: ILogin = result.data;

      try {
        // 2️⃣ Chamar LoginService para gerar JWT
        const tokenData = await this.loginService.validateLogin(
          loginData.email,
          loginData.password
        );

        return res.status(200).json(tokenData);
      } catch (error: any) {
        return res.status(401).json({ error: error.message });
      }
    });

    return this.route;
  }
}
const loginController = new LoginController();
export default loginController.handle();
