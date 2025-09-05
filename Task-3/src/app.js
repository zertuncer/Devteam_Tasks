import express from "express";
import cors from "cors";
// no dotenv
import { initDataSource } from "./data-source.js";
import todosRouter from "./routes/todosRouter.js";
import usersRouter from "./routes/usersRouter.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/todos", todosRouter);
app.use("/api/users", usersRouter);

app.use(notFoundHandler);
app.use(errorHandler);

// port sabit

initDataSource()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("DataSource init error", err);
        process.exit(1);
    });
