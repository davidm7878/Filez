import db from "#db/client";

export async function createFolder({ name }) {
  const sql = `
  INSERT INTO folders (name)
  VALUES ($1)
  RETURNING *
  `;

  const {
    rows: [newFolder],
  } = await db.query(sql, [name]);
  return newFolder;
}

export async function createFile({ name, size, folderId }) {
  const sql = `
  INSERT INTO files (name, size, folder_id)
  VALUES ($1, $2, $3)
  RETURNING *
  `;

  const {
    rows: [newFile],
  } = await db.query(sql, [name, size, folderId]);
  return newFile;
}

export async function getFiles() {
  const sql = `
  SELECT
    files.*,
    folders.name AS folder_name
  FROM
    files
    JOIN folders ON files.folder_id = folders.id
  `;
  const { rows: files } = await db.query(sql);
  return files;
}

export async function getFolders() {
  const sql = `
  SELECT *
  FROM folders
  `;
  const { rows: folders } = await db.query(sql);
  return folders;
}
export async function getFolder(id) {
  const sql = `
  SELECT *
  FROM folders
  WHERE id = $1
  `;
  const {
    rows: [folder],
  } = await db.query(sql, [id]);
  return folder;
}

export async function getFilesByFolderId(folderId) {
  const sql = `
  SELECT *
  FROM files
  WHERE folder_id = $1
  `;
  const { rows: files } = await db.query(sql, [folderId]);
  return files;
}
