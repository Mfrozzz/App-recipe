import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/recipes/search", async (req, res)=>{
    res.json({
        message: 'success :)'
    })
});

app.listen(5000, ()=>{
    console.log(`Server Running on http://localhost:${process.env.PORT}/api/recipes/search`);
});