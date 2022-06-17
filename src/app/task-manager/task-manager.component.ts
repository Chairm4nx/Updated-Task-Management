import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TaskModel } from '../shared/models/task-model';
import { TasksService } from './tasks.service';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';



@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['taskName', 'taskDescription', 'taskDateCreated', 'taskDateModified','tags', 'taskStatus', 'action'];
  dataSource = new MatTableDataSource<TaskModel>();
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchKey: any;

  
  constructor(private dialog: MatDialog,
    private snackBar: MatSnackBar,
     private tm: TasksService, 
     private router: Router,
     private cd: ChangeDetectorRef) { }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.populateTable();
  }

  populateTable(): void {
    this.tm.getTableData().subscribe({  
      next: (data:any)=>{
        this.dataSource.data = data;
      }
    })
    //this.clonedDataSource = data;
  }

  search(){
    this.searchKey= this.searchKey.trim();
    this.searchKey = this.searchKey.toLowerCase();
    this.tm.search(this.searchKey).subscribe(data =>{
      if(data){
        this.dataSource.data = data;
        this.cd.detectChanges();
      }
    })
  }

  // openDialog(header : string, id?:string){
  //   if(header === 'Add'){
  //     const dialog = this.dialog.open(TaskDialogComponent, {
  //       data : {header:header},
  //     }).afterClosed().subscribe((data: any) =>{ 
  //       if(data){
  //         this.tm.addTask(data).subscribe( res =>{
  //           this.populateTable();
  //           this.cd.detectChanges();
  //         });
  //       }
  //     });
  //   }
  // }


  // updateDialog(existingTask: any, id:string){
  //   this.tm.getTableDataById(id).subscribe(res=>{
  //   this.dialog.open(UpdateTaskComponent, {
  //     data: {
  //       title:"Edit",
  //       task: existingTask
  //     },
  //   }).afterClosed().subscribe((data:any)=>{
  //     if(data){
  //       this.tm.editTask(data, data.taskId)
  //       .subscribe(res => {
  //         this.populateTable();
  //         this.cd.detectChanges();
  //         this.dialog.open(ConfirmationDialogComponent, )
  //       })
  //     }
  //   } )
  //   });
  // }

  deleteDialog(id:string){
    this.tm.getTableDataById(id).subscribe(res=>{
      const dialog = this.dialog.open(ConfirmationDialogComponent, {
        width:'300px',
        data: {action:'Delete', header:'Delete', content:'Are you sure to delete task?', okBtn: 'Yes', cancelBtn: 'No', task:res}
      }).afterClosed().subscribe((data:any) =>{
        if(data){
          this.openSnackBar("Task deleted successfully", "Close");
          this.tm.deleteTask(data.taskId).subscribe(res => {
            this.populateTable();
            this.cd.detectChanges();
          });
        }
      });
    });
  }

  // deleteDialog(existingTask: TaskModel){
  //   this.dialog.open(ConfirmationDialogComponent,{
  //     data: {
  //       title: 'Delete',
  //       task: existingTask
  //     }
  //   }).afterClosed().subscribe((data: any) =>{
  //     if(data){
  //       this.deleteTask(data);
  //     }
  //   })
  // }
  
  // deleteTask(data: any){
  //   this.ts.getDeleteTask(data).subscribe(res => {
  //     this.populate();
  //   })

  openSnackBar(message: string, action: string) {
    const snackBarOpt: MatSnackBarConfig = {
      duration: 2000,
      panelClass: ['mat-toolbar', 'mat-warn'],
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

  addTask(){
    this.router.navigate(['/tasks']);
  }

  updateTask(id:string){
    this.router.navigate(['/tasks/'+id]);
  }


}

