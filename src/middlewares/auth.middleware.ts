import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "123";

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
    const user = jwt.verify(token, SECRET_KEY);
    // Para o TypeScript reconhecer `req.user`, podemos fazer:
    (req as any).user = user;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token inválido ou expirado" });
  }
}
