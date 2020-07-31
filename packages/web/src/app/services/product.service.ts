import { Department } from './../interfaces/department';
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
            let arrayDepartments = product.departments as string[];
            product.departments = arrayDepartments.map((id) =>
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

  add(product: Product): Observable<Product>{
    const departments = (product.departments as Department[]).map(department => department._id);
    return this.http.post<Product>(this.url, { ...product, departments})
    .pipe(
      tap((prod) => {
          this.productsSubject$.getValue()
            .push({...product, _id: prod._id})
        })
    )
  }

  update(product: Product): Observable<Product> {
    const departments = (product.departments as Department[]).map(department => department._id);
    return this.http.patch<Product>(`${this.url}/${product._id}`, { ...product, departments}).pipe(
      tap((prod) => {
        const products = this.productsSubject$.getValue();
        const findProduct = products.findIndex((prod) => prod._id === product._id);
        if (findProduct >= 0){
          products[findProduct] = prod;
        }
      })
    );
  }

  delete(product: Product): Observable<Product> {
    return this.http.delete<Product>(`${this.url}/${product._id}`)
      .pipe(
        tap(() => {
          const products = this.productsSubject$.getValue();
          const findProduct = products.findIndex((d) => d._id === product._id);
          if (findProduct >= 0){
            products.splice(findProduct, 1);
          }
        })
    );
  }
}
