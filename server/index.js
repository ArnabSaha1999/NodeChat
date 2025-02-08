import express from "express";
import cookieParser from "cookie-parser";
import corsConfig from "./utils/corsConfig.js";
import { host, port } from "./environment.js";
import connectDB from "./db/index.js";
import registerRoutes from "./routes/index.js";
import upload from "./cloudinary/index.js";

const app = express();

app.use(corsConfig);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

registerRoutes(app);

const server = app.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});

connectDB();
