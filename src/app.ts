import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth_routes"
import { authenticate } from "./middlewares/auth_middlewares";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Sporton Backend API is Running");
});

app.get("/test-middleware",authenticate, (req, res) => {
    res.send("Endpoint ini ekarang tidak bisa di akses publik");
});

export default app;