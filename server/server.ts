import express from "express";
import helmet from "helmet";
import cors from "cors";

import apiRoutes from "./routes/routes";

const PORT = 8080;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
