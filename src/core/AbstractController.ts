import { Router } from "express";

export abstract class AbstractController {
  protected route = Router();

  abstract handle(): Router;
}
