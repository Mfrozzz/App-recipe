import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/routes";
import rateLimiter from "./middlewares/rateLimiter";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(rateLimiter);
app.use(routes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;