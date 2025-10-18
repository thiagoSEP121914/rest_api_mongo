import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function getSecretKey(): string {
  const key = process.env.JWT_SECRET;
  if (!key) throw new Error("JWT não foi definida no env");
  return key;
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  try {
    const user = jwt.verify(token, getSecretKey());
    (req as any).user = user;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token inválido ou expirado" });
  }
}
