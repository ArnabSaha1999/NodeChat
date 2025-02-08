import cors from "cors";
import { origin } from "../environment.js";

const corsConfig = cors({
  origin: [origin],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
});

export default corsConfig;
