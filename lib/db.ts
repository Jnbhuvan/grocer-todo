import mongoose from "mongoose";

// Load MongoDB connection string from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// If no MongoDB URI is found, throw an error (ensures safety during development)
if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

// Create a cached object on the global scope to persist the connection
// across hot reloads in development (helps avoid multiple connections)
let cached = (global as any).mongoose;

// If no cached connection exists, initialize one
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

// Async function to connect to MongoDB
const connect = async () => {
  // Return existing connection if already connected
  if (cached.conn) {
    return cached.conn;
  }

  // If no pending connection promise exists, create one
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "next15todo", // Database name
      bufferCommands: false, // Disable mongoose buffering
    });
  }

  try {
    // Wait for the promise to resolve and cache the connection
    cached.conn = await cached.promise;
    console.log("MongoDB connected");
    return cached.conn;
  } catch (err) {
    // If connection fails, reset the cached promise for retry
    cached.promise = null;
    throw err;
  }
};

// Export the connect function for use in other parts of the app
export default connect;
