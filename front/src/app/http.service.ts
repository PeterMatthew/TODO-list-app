import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Task {
  id: number;
  content: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<Task[]>("http://localhost:3000/tasks");
  }

  createTask(content: string) {
    return this.http.post<Task>("http://localhost:3000/tasks", { content });
  }

  toggleStatus(id: number) {
    return this.http.post<Task>(`http://localhost:3000/tasks/toggle-status/${id}`, {});
  }

  editTask(id: number, content: string) {
    return this.http.put<Task>(`http://localhost:3000/tasks/${id}`, { content });
  }

  deleteTask(id: number) {
    return this.http.delete<Task>(`http://localhost:3000/tasks/${id}`, {});
  }
}
