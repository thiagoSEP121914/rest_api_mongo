import { Router } from "express";
import LoginController from "../features/login/LoginController";

const unAuthRouter = Router();

unAuthRouter.use("/login", LoginController);

export default unAuthRouter;
