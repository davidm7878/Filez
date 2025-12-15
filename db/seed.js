import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createFolder, createFile } from "./queries/foldersAndFiles.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  const createFolders = [];

  for (let i = 0; i < 3; i++) {
    const name = faker.lorem.word();
    const folder = await createFolder({ name });
    createFolders.push(folder);
  }
  for (const folder of createFolders) {
    for (let j = 0; j < 5; j++) {
      const name = faker.lorem.word();
      const size = faker.number.int({ min: 1, max: 100 });

      await createFile({ name, size, folderId: folder.id });
    }
  }

  console.log("Database seeded successfully");
}
