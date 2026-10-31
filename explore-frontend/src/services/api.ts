
import axios from "axios";

import type {
  Employee,
  EmployeeFormData,
  Task,
  TaskFormData,
  TaskStatus,
  DashboardSummary,
} from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Employee APIs

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await api.get<Employee[]>("/employees/");
  return response.data;
};

export const createEmployee = async (
  data: EmployeeFormData
): Promise<Employee> => {
  const response = await api.post<Employee>("/employees/", data);
  return response.data;
};

export const deleteEmployee = async (
  id: number
): Promise<void> => {
  await api.delete(`/employees/${id}`);
};

// Task APIs

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get<Task[]>("/tasks/");
  return response.data;
};

export const createTask = async (
  data: TaskFormData
): Promise<Task> => {
  const response = await api.post<Task>("/tasks/", data);
  return response.data;
};

export const updateTaskStatus = async (
  id: number,
  status: TaskStatus
): Promise<void> => {
  await api.patch(`/tasks/${id}/status`, { status });
};

// Dashboard API

export const getDashboardSummary =
  async (): Promise<DashboardSummary> => {
    const response = await api.get<DashboardSummary>(
      "/dashboard/summary"
    );

    return response.data;
  };
