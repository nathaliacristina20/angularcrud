import { DepartmentService } from './../../services/department.service';
import { Component, OnInit } from '@angular/core';

import { Department } from '../../interfaces/department';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent implements OnInit {
  constructor(private departmentService: DepartmentService) {}

  depName: string;
  departments: Department[] = [
    {
      name: 'Departamento de Vendas',
      id: '2',
    },
  ];

  ngOnInit(): void {
    this.departmentService.get()
    .subscribe(
      (data) => {
        this.departments = data;
      },
      (error) => {
        console.error(error);
      }
    )
  }

  save() {
    this.departmentService.add({ name: this.depName }).subscribe(
      (data) => {
        console.log(data);
        this.clearFields();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  clearFields(){
    this.depName = "";
  }

  cancel() {}

  update(department: Department) {}

  delete(department: Department) {}
}
