export type Department =
  | "Engineering"
  | "Design"
  | "Product"
  | "Marketing"
  | "Sales"
  | "HR";


export interface Employee {
    id: string;
    name: string;
    email: string;
    department: Department;
}