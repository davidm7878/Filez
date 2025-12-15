import express from "express";
import {
  createFolder,
  createFile,
  getFiles,
  getFolders,
  getFolder,
  getFilesByFolderId,
} from "#db/queries/foldersAndFiles";
const router = express.Router();
export default router;

router.get("/files", async (req, res, next) => {
  const files = await getFiles();
  res.json(files);
});

router.get("/folders", async (req, res, next) => {
  const folders = await getFolders();
  res.json(folders);
});

router.post("/folders", async (req, res, next) => {
  if (!req.body) return res.status(400).send("Request body required.");
  const { name } = req.body;
  if (!name) {
    return res.status(400).send("Missing required field: name");
  }
  const folder = await createFolder({ name });
  res.status(201).json(folder);
});

router.post("/files", async (req, res, next) => {
  if (!req.body) return res.status(400).send("Request body required.");
  const { name, size, folderId } = req.body;
  if (!name || !size || !folderId) {
    return res
      .status(400)
      .send("Missing required fields: name, size, folderId");
  }
  const file = await createFile({ name, size, folderId });
  res.status(201).json(file);
});

router.get("/folders/:id/files", async (req, res, next) => {
  const { id } = req.params;
  const folder = await getFolder(id);
  if (!folder) return res.status(404).send("Folder not found");
  const files = await getFilesByFolderId(id);
  res.json(files);
});

router.post("/folders/:id/files", async (req, res, next) => {
  const { id } = req.params;
  const folder = await getFolder(id);
  if (!folder) return res.status(404).send("Folder not found");

  if (!req.body) return res.status(400).send("Request body required.");
  const { name, size } = req.body;
  if (!name || size === undefined) {
    return res.status(400).send("Missing required fields: name, size");
  }

  const file = await createFile({ name, size, folderId: id });
  res.status(201).json(file);
});

router.get("/folders/:id", async (req, res, next) => {
  const { id } = req.params;
  const folder = await getFolder(id);
  if (!folder) return res.status(404).send("Folder not found");
  const files = await getFilesByFolderId(id);
  res.json({ ...folder, files });
});
