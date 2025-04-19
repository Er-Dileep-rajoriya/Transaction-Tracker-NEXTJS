'use server';
import mongoose from 'mongoose';

const DATABASE_URL = process.env.MONGODB_URL;

export const ConnectToDB = async () => {
    if (mongoose.connections[0].readyState) {
        console.log("Already connected to MongoDB.");
        return;
    }

    try {
        await mongoose.connect(DATABASE_URL as string, {
            dbName: "Expense-Tracker",
        });
        console.log("Successfully Connected to MongoDB.");
    } catch (err) {
        console.error("Error in Connecting to DATABASE:", err);
    }
}
