import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// const client = await MongoClient.connect(process.env.MONGO_URL);

let database;
export async function connectDB() {
  try {
    const client = await MongoClient.connect(process.env.MONGO_URL);
    database = client.db("prj-todo");
    console.log("Connected");
  } catch (error) {
    console.log("Mongodb connection error : ", error);
  }
}

export function getDB() {
  return database;
}
