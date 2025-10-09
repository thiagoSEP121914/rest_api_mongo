import { NextFunction, Request, Response, Router } from "express";
import { AbstractController } from "../../core/AbstractController";
import { request } from "http";

export class UserController extends AbstractController {
  handle(): Router {
    this.route.get("/", async (request: Request, response: Response) => {
      response.send("Users");
    });

    this.route.get("/: id", async (request: Request, response: Response) => {
      response.send("Users");
    });
    return this.route;
  }
}
