import { create } from "zustand";
import { getEmployees } from "../services/employeesService";
import type { Employee } from "../types";

interface EmployeeState {
    employees: Employee[],
    loading: boolean,
    fetchEmployees: () => Promise<void>
}

export const useEmployeesStore = create<EmployeeState>((set) => ({
    employees:[],
    loading: true,
    fetchEmployees: async() => {
        const data = await getEmployees()
        set({employees: data, loading: false})
    }
}))