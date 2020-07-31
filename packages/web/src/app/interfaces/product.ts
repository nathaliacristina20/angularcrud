import { Department } from "./department";

export interface Product {
  id: string;
  name: string;
  department: Department[] | Array<string>;
  stock: number;
  price: number;
}
