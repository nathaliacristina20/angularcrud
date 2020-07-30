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
  private departmentSubject$: BehaviorSubject<Department[]> = new BehaviorSubject<Department[]>(null);
  private loaded = false;

  constructor(private http: HttpClient) {}

  get(): Observable<Department[]> {
    if (!this.loaded) {
      this.http
        .get<Department[]>(this.url)
        .pipe(
          tap((deps) => {
            console.log(deps);
          })
        )
        .subscribe(this.departmentSubject$);
      this.loaded = true;
    }

    // O asObservable indica que este observable
    // sera apenas readonly, ou seja, ninguem conseguira
    // dar um next nele e inserir algum outro dado
    return this.departmentSubject$.asObservable();
  }

  add(department: Omit<Department, 'id'>): Observable<Department> {
    return this.http
      .post<Department>(this.url, department)
      .pipe(
        tap((dep: Department) => this.departmentSubject$.getValue().push(dep))
      );
  }
}
