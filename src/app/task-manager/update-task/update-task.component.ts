import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskModel } from 'src/app/shared/models/task-model';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { IParams } from 'src/app/shared/models/task-model';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { TasksService } from '../tasks.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit {

  title: string ='';
  // existingTask: any;

  taskManagerFormGroup = new FormGroup({
    taskId: new FormControl(null),
    taskName :new FormControl (null, Validators.required),
    taskDescription : new FormControl (null, Validators.required),
    status : new FormControl(null, Validators.required)
  });
  tagsFormGroup = this._formBuilder.group({
    tag : [[], Validators.required]
  });
  
  constructor(private _formBuilder: FormBuilder,
              private ts: TasksService,
              private route: ActivatedRoute,
              private router: Router,
              // private dialog: MatDialog,
              // public dialogRef: MatDialogRef<TaskDialogComponent>,
              // @Inject(MAT_DIALOG_DATA)public data: any
              )
              { 
                // this.title = data.title;
                // this.existingTask = data.task;
              }

ngOnInit(): void {
  this.ts.getTaskById(this.route.snapshot.paramMap.get('id')).subscribe(res =>{
    this.set(res)
  })

}

set(value:any) {
  this.taskManagerFormGroup.controls['taskId'].setValue(value.taskId)
  this.taskManagerFormGroup.controls['taskName'].setValue(value.taskName)
  this.taskManagerFormGroup.controls['taskDescription'].setValue(value.taskDescription)
  this.taskManagerFormGroup.controls['status'].setValue(value.status.toString());
  
}


save(){
  // this.existingTask.taskName = this.taskManagerFormGroup.controls['taskName'].value;
  // this.existingTask.taskDescription = this.taskManagerFormGroup.controls['taskDescription'].value;
  // this.existingTask.status = this.taskManagerFormGroup.controls['status'].value;
  // this.cancel(this.existingTask)
  // this.ts.editTask(this.taskManagerFormGroup.value, this.route.snapshot.paramMap.get('id'))
  // .subscribe(res => {
  //   this.router.navigate(['/'])
  // })

}
onBack(){
  this.router.navigate(['/']);
}

cancel(data?: any){
  this.router.navigate(['/']);
}
}