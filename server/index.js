import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongo/connect.js";
import postRoutes from "./routes/postRoutes.js";
import openAiRoutes from "./routes/openAiRoutes.js";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/openai", openAiRoutes);

app.get("/", async (req, res) => {
  res.send("HELLO OPEN Ai");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URI);
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
