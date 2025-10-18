import { Router, Request, Response } from "express";
import { AbstractController } from "../../core/AbstractController";
import { StatusCodes } from "http-status-codes";

class ProductController extends AbstractController {
  handle(): Router {
    this.route.get("/products", (req: Request, res: Response) => {
      res.status(StatusCodes.ACCEPTED).json({ name: "Queijo" });
    });

    this.route.get("/product/:id", (req: Request, res: Response) => {
      const productId = req.params.id;
      res.status(StatusCodes.OK).json({ message: `Produto ${productId}` });
    });

    return this.route;
  }
}

const produtoController = new ProductController();
export default produtoController.handle();
