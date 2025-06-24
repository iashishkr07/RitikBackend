// import mongoose from "mongoose";

// const connectDB = ()=>{
//     mongoose.connect(`${process.env.MONGODB_URI}/HMS`, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => console.log('✅ MongoDB connected'))
//     .catch((error) => console.error('❌ MongoDB connection error:', error));

// }

// export default connectDB

// config/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    console.log("Attempting to connect to MongoDB...");
    console.log(
      "MongoDB URI:",
      process.env.MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, "//****:****@")
    ); // Hide credentials in logs

    const conn = await mongoose.connect( `${process.env.MONGODB_URI}/H`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });

    // Test the connection
    await mongoose.connection.db.admin().ping();
    console.log(
      `✅ MongoDB connected successfully to: ${conn.connection.host}`
    );
    console.log(`Database name: ${conn.connection.name}`);

    // Handle connection events
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error("Full error:", error);
    process.exit(1);
  }
};

export default connectDB;
