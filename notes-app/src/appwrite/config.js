import { Client, Databases } from "appwrite";

// Log environment variables to check if they are being imported correctly
console.log("VITE_ENDPOINT:", import.meta.env.VITE_ENDPOINT);
console.log("VITE_PROJECT_ID:", import.meta.env.VITE_PROJECT_ID);

const client = new Client()
  .setEndpoint(import.meta.env.VITE_ENDPOINT)
  .setProject(import.meta.env.VITE_PROJECT_ID);

const databases = new Databases(client);

const collections = [
  {
    name: "notes",
    id: import.meta.env.VITE_COLLECTION_NOTES_ID,
    dbId: import.meta.env.VITE_DATABASE_ID,
  },
];

export { client, databases, collections };
