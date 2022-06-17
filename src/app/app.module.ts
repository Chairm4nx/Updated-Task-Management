import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from './material/material.module';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { TaskDialogComponent } from './task-manager/task-dialog/task-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationDialogComponent } from './task-manager/confirmation-dialog/confirmation-dialog.component';
import { RatingComponent } from './rating/rating.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UpdateTaskComponent } from './task-manager/update-task/update-task.component';
import { RouterModule } from '@angular/router';
import { TaskManagerModule } from './task-manager/task-manager.module';




@NgModule({
  declarations: [
    AppComponent,
    RatingComponent,
 

  ],
  imports: [

    AppRoutingModule,
    TaskManagerModule,
    ReactiveFormsModule,
    RouterModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
