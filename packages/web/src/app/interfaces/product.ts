import { Department } from "./department";

export interface Product {
  id: string;
  name: string;
  department: Department[];
  stock: number;
  price: number;
}
