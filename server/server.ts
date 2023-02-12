import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

import apiRoutes from "./routes/routes";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(limiter);

app.use("/api", apiRoutes);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server started on port ${process.env.PORT}`);
});
