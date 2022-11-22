import { MongoClient } from "mongodb";

const url = process.env.DB_URI as string;
const client = new MongoClient(url);
let database: MongoClient | null = null;

const getDatabase = async () => {
  if (database === null) {
    database = await client.connect();
  }
  return database.db(process.env.DB_NAME);
};

export default getDatabase;
