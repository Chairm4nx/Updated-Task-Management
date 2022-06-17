import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { UpdateTaskComponent } from './task-manager/update-task/update-task.component';
import { TaskDialogComponent } from './task-manager/task-dialog/task-dialog.component';
import { NotFoundComponent } from './task-manager/not-found/not-found.component';
import { LoginComponent } from './login/login/login.component';

const routes: Routes = [
  
  {path:'tasks/:id', component: UpdateTaskComponent},
  {path:'tasks', component: TaskDialogComponent},
  {path:'', component: TaskManagerComponent},
  {path:'login', component:LoginComponent},
  {path: '**', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
