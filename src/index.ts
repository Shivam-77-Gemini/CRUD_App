import express from 'express';
const connectDB=require("./db/database");
connectDB();

const app = express()
app.use(express.json())
const PORT = 5001
app.use("/api/auth", require("./authe/route"))
app.listen(PORT, () => console.log(`Server Connected to port ${PORT}`))

