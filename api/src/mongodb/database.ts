import mongoose from 'mongoose';
import { use_mongodb_for_facilities } from '../services/config'

const {
  DB_CONNECTION_URL
} = process.env;

if (use_mongodb_for_facilities()) {
  console.log("Connecting to Database using DB Connection String: " + `${DB_CONNECTION_URL}`);

  mongoose.connect(`${DB_CONNECTION_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;

  db.on("error", () => {
    console.log("> error occurred from the database");
  });

  db.once("open", () => {
    console.log("> successfully opened the database");
  });
}

export default mongoose;