import { Department } from './../interfaces/department';
import { DepartmentService } from './department.service';
import { Product } from './../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';

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
      )
        .pipe(
          filter(([products, departments]) => products != null && departments != null),
          map(([products, departments]) => {
            for (let product of products) {
              let arrayDepartments = product.departments as string[];
              product.departments = arrayDepartments.map((id) =>
                departments.find((dep) => dep._id === id)
              );
            }
            return products;
          })
        )
        .subscribe(this.productsSubject$);

      this.loaded = true;
    }
    return this.productsSubject$.asObservable();
  }

  add(product: Product): Observable<Product> {
    const departments = (product.departments as Department[]).map(
      (department) => department._id
    );

    return this.http
      .post<Product>(this.url, { ...product, departments })
      .pipe(
        tap((prod) => {
          this.productsSubject$.getValue().push({ ...product, _id: prod._id });
        })
      );
  }

  update(prod: Product): Observable<Product> {
    let departments = (prod.departments as Department[]).map(d=>d._id);
    return this.http.patch<Product>(`${this.url}/${prod._id}`, {...prod, departments})
    .pipe(
      tap(() => {
        let products = this.productsSubject$.getValue();
        let i = products.findIndex(p => p._id === prod._id);
        if (i>=0)
          products[i] = prod;
      })
    )
  }

  delete(product: Product): Observable<Product> {
    return this.http.delete<Product>(`${this.url}/${product._id}`).pipe(
      tap(() => {
        const products = this.productsSubject$.getValue();
        const findProduct = products.findIndex((d) => d._id === product._id);
        if (findProduct >= 0) {
          products.splice(findProduct, 1);
        }
      })
    );
  }
}
