// connectDB.js
import mongoose from "mongoose";
import config from "config";
import dotenv from 'dotenv';
///TODO: REMOVE
import { seedDatabase } from "../src/utils/seeder.js";
dotenv.config();

const mongodbUrl = process.env.MONGODB_URL || config.get("mongodb.url");
const dbName = process.env.DB_NAME || 'synzy-prod';

const connectDB = async () => {
    try {
        await mongoose.connect(mongodbUrl, {
            dbName: dbName
        });
        console.log(`MongoDB connected to database: ${mongoose.connection.name}`);
        ///TODO: REMOVE
        //seedDatabase();
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

export default connectDB;
