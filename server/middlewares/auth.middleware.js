import jwt from "jsonwebtoken";
import { jwtSecret } from "../environment.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).send("You are not authenticated!");
  }

  jwt.verify(token, jwtSecret, async (error, payload) => {
    if (error) {
      return res.status(403).send("Token is not valid!");
    }
    req.userId = payload.userId;
    next();
  });
};

export const validateMulter = (err, req, res, next) => {
  if (err) {
    console.error("Multer Error:", err); // This will show if something goes wrong
    return res.status(400).send({ error: err.message });
  }
  next();
};
