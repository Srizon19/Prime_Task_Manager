import express from "express"
import taskRouter from "./routes/taskRouter.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/tasks", taskRouter);


const PORT = 5500;

app.listen(PORT, console.log("server statred successfully"));