import { Router } from "express";
import ProductController from "../features/products/ProductController";

const authRouter = Router();

authRouter.use("/", ProductController);

export default authRouter;
