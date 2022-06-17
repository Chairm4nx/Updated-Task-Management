import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TaskModel, TaskStatus } from '../shared/models/task-model';
import {filter, map, switchMap } from 'rxjs/operators';


const headerDict ={
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
  'X-Skip-Interceptor': 'X-Skip-Interceptor'
};

const requestOptions = {
  headers: new HttpHeaders(headerDict),
};

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private api = environment.api;
  tableData: TaskModel[] = []

  constructor(private http: HttpClient) { }
  
getTableData(): Observable<TaskModel[]> {
  return this.http.get<TaskModel[]>(this.api, requestOptions);

}
getTableDataById(id:any): Observable<TaskModel[]>{
  return this.http.get<TaskModel[]>(`${this.api}/${id}`);
}

getTaskById(id:any): Observable<TaskModel[]>{
  return this.http.get<TaskModel[]>(this.api + id);
}

search(searchKey:any): Observable<TaskModel[]>{
  if(searchKey == ""){
    return this.getTableData();
  }
  else
  {
    return this.http.get<TaskModel[]>(this.getEndpoint('GET')).pipe(
      map(tasks => tasks.filter(t =>{
        return (t.status === TaskStatus.New ? 'new' : t.status === TaskStatus.InProgress ? 'in progress' : 'completed').includes(searchKey.toLowerCase()) || t.taskName.toLowerCase().includes(searchKey.toLowerCase()) ||
        t.taskDescription.toLowerCase().includes(searchKey.toLowerCase())
      }))
    );
  }
  
}


addTask(data:any):Observable<TaskModel[]>{
  return this.http.post<TaskModel[]>(this.getEndpoint('POST'), data, requestOptions);
}

editTask(data:any, id:string):Observable<TaskModel[]>{
  return this.http.put<TaskModel[]>(this.getEndpoint('PUT',id), data, requestOptions);
}

deleteTask(id:string):Observable<TaskModel[]>{
 return this.http.delete<TaskModel[]>(this.getEndpoint('DELETE',id), requestOptions);
}

private getEndpoint(keyword:string, param?:string): any{
  switch(keyword){
    case 'GET': return `${this.api}`;
    case 'POST' : return `${this.api}`;
    case 'GET_BY_ID': return `${this.api}/${param}`;
    case 'PUT': return `${this.api}/${param}`;
    case 'DELETE' : return `${this.api}/${param}`;
    default: return "";
  }
}

}