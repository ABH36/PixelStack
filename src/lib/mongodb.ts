import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient> | undefined;

/**
 * Lazily creates (and caches) the MongoDB connection. Deferring the actual
 * `connect()` call until first use — rather than at module load — avoids
 * Next.js's build-time route analysis triggering a real network connection
 * when it merely imports this module to inspect the API route.
 */
export function getMongoClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable");
  }

  if (process.env.NODE_ENV === "development") {
    // Reuse the connection across HMR reloads in dev so we don't exhaust
    // MongoDB Atlas connection limits on every file save.
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(uri).connect();
    }
    return global._mongoClientPromise;
  }

  if (!clientPromise) {
    clientPromise = new MongoClient(uri).connect();
  }
  return clientPromise;
}
