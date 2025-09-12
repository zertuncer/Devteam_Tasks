import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import todosRouter from "./routes/todosRouter.js";
import usersRouter from "./routes/usersRouter.js";
import authRouter from "./routes/authRouter.js";
import meRouter from "./routes/meRouter.js";
import { notFoundHandler, errorHandler } from "./middleware/errors/errorHandler.js";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

app.use("/api/todos", todosRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/me", meRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
