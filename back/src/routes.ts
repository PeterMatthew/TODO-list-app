import { Router } from "express";

import { TaskController } from "./controllers/TaskController";

const router = Router();

const taskController = new TaskController();

router.post("/tasks", taskController.create);
router.post("/tasks/toggle-status/:id", taskController.toggleStatus);
router.get("/tasks", taskController.show);
router.put("/tasks/:id", taskController.update);
router.delete("/tasks/:id", taskController.delete);

export { router };
