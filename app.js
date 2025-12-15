import express from "express";
import foldersAndFilesRouter from "./api/foldersAndFiles.js";
const app = express();
export default app;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Filez API.");
});

app.use("/", foldersAndFilesRouter);
