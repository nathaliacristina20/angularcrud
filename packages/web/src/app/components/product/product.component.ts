import { takeUntil } from 'rxjs/operators';
import { Department } from './../../interfaces/department';
import { Product } from './../../interfaces/product';
import { ProductService } from './../../services/product.service';
import { DepartmentService } from './../../services/department.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  productForm: FormGroup = this.formBuilder.group({
    _id: [null],
    name: ['', Validators.required],
    stock: [0, Validators.required],
    price: [0, Validators.required],
    departments: [[], Validators.required],
  });

  @ViewChild('form') form: NgForm;

  products: Product[] = [];
  departments: Department[] = [];
  isEditing = false;

  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productService
      .get()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((products) => (this.products = products));
    this.departmentService
      .get()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((departments) => (this.departments = departments));
  }

  save(){
    const data = this.productForm.value;

    if (this.isEditing){
      this.productService.update(data)
      .subscribe(
        (p) => this.notify('Updated!')
      );
    } else {
      this.productService.add(data).subscribe(
        (p) => this.notify('Inserted!')
      );
    }
    this.clearFields();
    this.isEditing = false;
  }

  update(product: Product){
    this.isEditing = true;
    this.productForm.setValue({ _id: product._id, ...product});
  }

  delete(product: Product){
    this.productService.delete(product)
      .subscribe(
        () => this.notify('Deleted!'),
        (error) => console.error(error)
      )
  }

  notify(message: string){
    this.snackBar.open(message, 'OK', { duration: 3000 });
  }

  clearFields(){
    //this.productForm.reset();
    this.form.resetForm();
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
  }
}
