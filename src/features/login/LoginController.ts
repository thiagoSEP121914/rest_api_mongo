import { Router, Request, Response } from "express";
import { AbstractController } from "../../core/AbstractController";

class LoginController extends AbstractController {
  handle(): Router {
    this.route.post("/", (req: Request, res: Response) => {
      const user = req.body;
      
    });
  }
}
