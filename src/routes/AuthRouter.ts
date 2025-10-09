import { Router } from "express";
import { UserController } from "../features/user/UserController";

class AuthRouter {
  protected authRouter = Router();

  router(): Router {
    this.authRouter.use("/user", UserController);
    return this.authRouter;
  }
}

const authRouter = new AuthRouter();
export default authRouter;
