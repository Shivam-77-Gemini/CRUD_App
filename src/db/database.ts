
import express from 'express';
const myDb=require("mongoose");

const app=express();
app.use(express.json());

const atlasDatabase = `mongodb+srv://Anupam77:Shivam12@myapp.ihdtx1w.mongodb.net/?retryWrites=true&w=majority`;
const connectDB = async () => {
  await myDb.connect(atlasDatabase, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB Connected");
}
module.exports = connectDB;
