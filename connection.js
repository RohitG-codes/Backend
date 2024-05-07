import mongoose from "mongoose";

async function connectionDB(url) {
  return mongoose.connect(url);
}

export default connectionDB;
