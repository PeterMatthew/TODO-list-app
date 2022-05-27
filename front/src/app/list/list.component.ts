import { Component, OnInit } from '@angular/core';

import { NzModalService } from 'ng-zorro-antd/modal';
import { HttpService } from "../http.service";

export interface Task {
  id: number;
  content: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private httpService: HttpService, private modal: NzModalService) { }

  tasks: Task[] | undefined;
  isVisibleCreate = false;
  isVisibleEdit = false;
  content = '';
  selectedTaskId = 0;

  ngOnInit(): void {
    this.getTasks();
  }

  showDeleteConfirm(id: number, content: string): void {
    this.modal.confirm({
      nzTitle: 'Deseja deletar essa tarefa ?',
      nzContent: `A tarefa <b style="color: red;">${content}</b> será deletada`,
      nzOkText: 'Sim',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteTask(id),
      nzCancelText: 'Não',
    });
  }

  showModalCreate() {
    this.isVisibleCreate = true;
  }

  showModalEdit(content: string, id: number): void {
    this.selectedTaskId = id;
    this.content = content;
    this.isVisibleEdit = true;
  }

  handleOkCreate(): void {
    this.isVisibleCreate = false;
    this.createTask();
    this.content = '';
  }

  handleOkEdit(): void {
    this.isVisibleEdit = false;
    this.editTask(this.selectedTaskId);
    this.content = '';
  }

  handleCancel(): void {
    this.isVisibleCreate = false;
    this.isVisibleEdit = false;
  }

  getTasks() {
    this.httpService.getTasks().subscribe((data: Task[]) => this.tasks = data);
  }

  createTask() {
    this.httpService.createTask(this.content).subscribe((data: Task) => this.getTasks());
  }

  toggleStatus(id: number) {
    this.httpService.toggleStatus(id).subscribe((data: Task) => this.getTasks());
  }

  editTask(id: number) {
    this.httpService.editTask(id, this.content).subscribe((data: Task) => this.getTasks());
  }

  deleteTask(id: number) {
    this.httpService.deleteTask(id).subscribe((data: Task) => this.getTasks());
  }

}
