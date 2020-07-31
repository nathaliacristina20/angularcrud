import { DepartmentService } from './department.service';
import { Product } from './../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly url = 'http://localhost:3333/products';
  private productsSubject$: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >(null);

  private loaded = false;

  constructor(
    private http: HttpClient,
    private departmentService: DepartmentService
  ) {}

  get(): Observable<Product[]> {
    if (!this.loaded) {
      combineLatest(
        this.http.get<Product[]>(this.url),
        this.departmentService.get()
      ).pipe(
        map(([products, departments]) => {
          for (let product of products) {
            let arrayDepartments = product.department as string[];
            product.department = arrayDepartments.map((id) =>
              departments.find((dep) => dep._id === id)
            );
          }
          return products;
        }),
        tap((products) => console.log(products))
      );

      this.http.get<Product[]>(this.url).subscribe(this.productsSubject$);
      this.loaded = true;
    }
    return this.productsSubject$.asObservable();
  }
}
