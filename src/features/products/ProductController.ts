import { Router, Request, Response } from "express";
import { AbstractController } from "../../core/AbstractController";
import { StatusCodes } from "http-status-codes";
import ProductService from "./ProductService";
import ProductRepository from "./ProductRepository";

class ProductController extends AbstractController {
  private productService = new ProductService(new ProductRepository());

  handle(): Router {
    this.route.get("/", async (req: Request, res: Response) => {
      try {
        const listOfProducts = await this.productService.findAll();
        res.status(StatusCodes.OK).json(listOfProducts);
      } catch (error) {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Erro ao buscar Produtos" });
      }
    });

    this.route.get("/:id", async (req: Request, res: Response) => {
      try {
        const productId = req.params.id;
        const product = await this.productService.findById(productId);

        if (!product) {
          return res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: "Produto não encontrado" });
        }

        res.status(StatusCodes.OK).json(product);
      } catch (error) {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Erro ao buscar produto" });
      }
    });

    this.route.post("/", async (req: Request, res: Response) => {
      try {
        const product = req.body;
        const createdproduct = await this.productService.create(product);
        res.status(StatusCodes.OK).json(createdproduct);
      } catch (error) {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Erro ao criar produto" });
      }
    });

    return this.route;
  }
}

const produtoController = new ProductController();
export default produtoController.handle();
