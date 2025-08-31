import express from "express";
import cors from "cors";
import todosRouter from "./routes/todosRouter.js";
import usersRouter from "./routes/usersRouter.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/todos", todosRouter);
app.use("/api/users", usersRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
