import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskModel } from 'src/app/shared/models/task-model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {

  title: string = '';
  taskManagerFormGroup = this._formBuilder.group({
    taskName : [null, Validators.required],
    taskDescription : [null, Validators.required],
    status : [0],


  });
  tagsFormGroup = this._formBuilder.group({
    tag : [[], Validators.required]
  });
  

  constructor( private _formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private ts: TasksService
    //  private dialog: MatDialog, 
    // public dialogRef: MatDialogRef<TaskDialogComponent>, 
    // @Inject(MAT_DIALOG_DATA) public data: string
    )  
              { 
                // this.title = data;
                
              }

  ngOnInit(): void {
    // // console.log(this.data);
  }

  save(){
    let task = this.taskManagerFormGroup.value;
    // let tagFormGroup = this.tagsFormGroup.controls['tag'].value as [];
    // task.tag = tagFormGroup.map(tag => ({ Name: tag['Name'] }));
    this.ts.addTask(task).subscribe({next: (data) => {
      if(data){
        this.openSnackBar("Task saved successfully!", "Close");
      }
    }});
    
    // this.cancel(task)
  }

  openSnackBar(message: string, action: string) {
    const snackBarOpt: MatSnackBarConfig = {
      duration: 2000,
      panelClass: ['mat-toolbar', 'mat-primary'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    };

    let snackBarRef = this.snackBar.open(message, action, snackBarOpt);

    snackBarRef.afterDismissed().subscribe(() =>{
      this.router.navigate(['/']);
    });
    
    snackBarRef.onAction().subscribe(() =>{
      snackBarRef.dismiss();
      this.router.navigate(['/']);
    });
  }


  cancel(data?:any,){
    this.router.navigate(['/']);
  }

  onBack(){
    this.router.navigate(['/']);
  }

}
