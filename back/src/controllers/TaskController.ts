import { Response, Request } from "express";
import { Task } from "../models/Task";

class TaskController {
  async create(request: Request, response: Response) {
    const { content } = request.body;

    const task = Task.build({ content });
    const newTask = await task.save();

    return response.json(newTask);
  }
  async toggleStatus(request: Request, response: Response) {
    const { id } = request.params;

    const task = await Task.findOne({
      where: {
        id
      }
    });
    if(task) {
      if(task.status) task.status = false;
      else task.status = true;
      const newTask = await task.save();

      return response.json(newTask);
    }else {
      return response.json({ error: "task nao encontrada" });
    }
  }
  async show(request: Request, response: Response) {
    const tasks = await Task.findAll();
    
    return response.json(tasks);
  }
  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { content } = request.body;

    const task = await Task.findOne({
      where: {
        id
      }
    });
    if(task) {
      task.content = content;
      const newTask = await task.save();
      
      return response.json(newTask);
    }else {
      return response.json({ error: "task nao encontrada" });
    }
  }
  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const task = await Task.findOne({
      where: {
        id
      }
    });
    if(task) {
      const newTask = await task.destroy();
      
      return response.json(newTask);
    }else {
      return response.json({ error: "task nao encontrada" });
    }
  }
}

export { TaskController };
