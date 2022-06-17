import { Injectable } from '@angular/core';
import { TaskModel } from '../models/task-model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { taskSeed } from '../services/tasks';
import { MatTableDataSource } from '@angular/material/table';

const headersDict = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
  'X-Skip-Interceptor': 'X-Skip-Interceptor'
};

@Injectable({
  providedIn: 'root'
})

export class MockTaskService {

  constructor() { }

  public dataSource: TaskModel[] = JSON.parse(JSON.stringify(taskSeed));


  getTaskData(){
    return of (this.dataSource);
  }

  getTaskById(id: string){
    return of ([]);
  }

  search(searchData: any){
    this.dataSource = this.dataSource.filter(t => t.taskName == searchData.toLocaleLowerCase().includes(searchData.toLocaleLowerCase()));
    return of(this.dataSource);
}

  addTask(val: any){
    this.dataSource.push(val);
    return of (this.dataSource); 
  }

  updateTask(task: TaskModel, id: string){
    this.dataSource = this.dataSource.filter(task => task.taskId == id);
    return of(this.dataSource);
  }

  getDeleteTask(id: any){
    this.dataSource = this.dataSource.filter(task => task.taskId != id);
    return of(this.dataSource);
  }
}