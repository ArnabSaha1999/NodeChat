import authRoutes from "./auth.routes.js";

const registerRoutes = (app) => {
  app.use("/api/auth", authRoutes);
};

export default registerRoutes;
