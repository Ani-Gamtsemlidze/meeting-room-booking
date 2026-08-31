import employeesData from "../data/employees.json";
import type { Employee } from "../types";
export async function getEmployees() {
  const cached = localStorage.getItem("employees");

  if (cached) {
    return JSON.parse(cached);
  }
  localStorage.setItem("employees", JSON.stringify(employeesData));
  return employeesData as Employee[];
}
