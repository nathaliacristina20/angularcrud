import { Department } from './../interfaces/department';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  readonly url = 'http://localhost:3333/departments';

  // O behaviorSubject retorna apenas o ultimo elemento
  private departmentsSubject$: BehaviorSubject<
    Department[]
  > = new BehaviorSubject<Department[]>(null);
  private loaded = false;

  constructor(private http: HttpClient) {}

  get(): Observable<Department[]> {
    if (!this.loaded) {
      this.http
        .get<Department[]>(this.url)
        .subscribe(this.departmentsSubject$);
      this.loaded = true;
    }

    // O asObservable indica que este observable
    // sera apenas readonly, ou seja, ninguem conseguira
    // dar um next nele e inserir algum outro dado
    return this.departmentsSubject$.asObservable();
  }

  add(department: Omit<Department, '_id'>): Observable<Department> {
    return this.http
      .post<Department>(this.url, department)
      .pipe(
        tap((dep: Department) => this.departmentsSubject$.getValue().push(dep))
      );
  }

  delete(department: Department): Observable<Department> {
    return this.http.delete<Department>(`${this.url}/${department._id}`).pipe(
      tap(() => {
        const departments = this.departmentsSubject$.getValue();
        const findDepartment = departments.findIndex((d) => d._id === department._id);
        if (findDepartment >= 0){
          departments.splice(findDepartment, 1);
        }
      })
    );
  }

  update(department: Department): Observable<Department> {
    return this.http.patch<Department>(`${this.url}/${department._id}`, department).pipe(
      tap((dep) => {
        const departments = this.departmentsSubject$.getValue();
        const findDepartment = departments.findIndex((d) => d._id === dep._id);
        if (findDepartment >= 0){
          departments[findDepartment].name = dep.name;
        }
      })
    );
  }
}
