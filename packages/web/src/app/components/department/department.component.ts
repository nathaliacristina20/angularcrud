import { DepartmentService } from './../../services/department.service';
import { Component, OnInit } from '@angular/core';

import { Department } from '../../interfaces/department';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent implements OnInit {
  constructor(
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar
  ) {}

  depName: string;
  departments: Department[] = [];

  departmentEditing: Department;

  private unsubscribe$: Subject<any> = new Subject();

  ngOnInit(): void {
    // O takeUntil dara unsubscribe automaticamente
    // depois de consultado
    this.departmentService.get()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (data) => {
        this.departments = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  save() {
    if (this.departmentEditing) {
      this.departmentService.update({ name: this.depName, _id: this.departmentEditing._id }).subscribe(
        (data) => {
          this.notify('Updated!');
          this.clearFields();
        },
        (error) => {
          this.notify('Error in editing');
          console.error(error);
        }
      );
    } else {
      this.departmentService.add({ name: this.depName }).subscribe(
        (data) => {
          this.notify('Inserted!');
          this.clearFields();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  clearFields() {
    this.depName = '';
    this.departmentEditing = null;
  }

  cancel() {}

  update(department: Department) {
    console.log('department ', department);
    this.depName = department.name;
    this.departmentEditing = department;
  }

  delete(department: Department) {
    console.log("delete", department);
    this.departmentService.delete(department)
      .subscribe(
        () => this.notify('Removed!'),
        err => {
          console.error(err);
        }
      )
  }

  notify(msg: string) {
    const durationInSeconds = 3;
    const duration = durationInSeconds * 1000;
    this.snackBar.open(msg, 'OK', { duration });
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
  }
}
