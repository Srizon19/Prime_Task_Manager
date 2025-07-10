import { Router } from "express";
import { createTask, deleteTask, getTasks } from "../controller/taskController.js";

const taskRouter = Router();

taskRouter.route("/").post(createTask);
taskRouter.route("/").get(getTasks);
taskRouter.route("/:id").delete(deleteTask);

export default taskRouter;