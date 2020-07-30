import { Component, OnInit } from '@angular/core';

import { Department } from '../../interfaces/department';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  constructor() { }

  depName: string;
  departments: Department[] = [
    {
      name: "Departamento de Vendas",
      id: '2'
    }
  ];

  ngOnInit(): void {
  }

  save(){

  }

  cancel(){

  }

  update(department: Department){

  }

  delete(department: Department){

  }

}
