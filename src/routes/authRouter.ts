import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import ProductController from "../features/products/ProductController";

const authRouter = Router();

authRouter.use("/products", authenticateToken, ProductController);
export default authRouter;
