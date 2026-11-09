import mongoose, { Connection } from 'mongoose'

const URI = "mongodb://127.0.0.1:27017";
const DBNAME = "test"

declare global {
  var globalForMongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}

let cached = global.globalForMongoose;

if (!cached) {
  cached = global.globalForMongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }
  // If no connection promise exists, create a new one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable mongoose buffering
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      // family: 4, // Use IPv4, skip trying IPv6
    };

    cached.promise = mongoose
      .connect(`${URI}/${DBNAME}`, opts)
      .then((mongoose) => {
        return mongoose.connection;
      });
  }

  try {
    cached.conn = await cached.promise;
    // console.log("MongoDB connected successfully");
    return cached.conn;
  } catch (error) {
    // Reset the promise on error to allow retries
    cached.promise = null;
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

// Optinal settings
// Event listeners for connection monitoring
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error: ", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected from MongoDB");
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Mongoose connection closed through app termination");
  process.exit(0);
});