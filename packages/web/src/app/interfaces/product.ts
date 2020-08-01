import { Department } from "./department";

export interface Product {
  _id: string;
  name: string;
  departments: Department[] | Array<string>;
  stock: number;
  price: number;
}
