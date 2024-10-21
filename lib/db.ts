import mongoose from "mongoose";

const DATABASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("Please define the DATABASE_URL environment variable in your .env.local file.");
}

// Create a global cache to prevent multiple connections during hot reloads in development
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB(): Promise<typeof mongoose> {
  // Return existing connection if already established
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection promise is set, start a new one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 30000, // 30 seconds timeout
    };

    cached.promise = mongoose
      .connect(DATABASE_URL!, opts)
      .then((mongoose) => {
        console.log("MongoDB connected successfully");
        return mongoose;
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        cached.promise = null; // Reset promise if connection fails
        throw error;
      });
  }

  // Await the established connection
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
 
