import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskManagerComponent } from './task-manager.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/module/shared.module';
import { TagsComponent } from './tags/tags.component';




@NgModule({
  declarations: [
    TaskManagerComponent,
    TaskDialogComponent,
    ConfirmationDialogComponent,
    UpdateTaskComponent,
    TagsComponent
  ],
  imports: [
    SharedModule
  ]
})
export class TaskManagerModule { }
