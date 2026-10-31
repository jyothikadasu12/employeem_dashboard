
export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
}

export type TaskStatus =
  | "Pending"
  | "In Progress"
  | "Completed";

export type TaskPriority =
  | "Low"
  | "Medium"
  | "High";

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: TaskPriority;
  due_date: string;
  status: TaskStatus;
  employee_id: number;
  employee_name: string;
}

export interface DashboardSummary {
  total_employees: number;
  total_tasks: number;
  completed_tasks: number;
  pending_tasks: number;
}

export interface EmployeeFormData {
  name: string;
  email: string;
  department: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: TaskPriority;
  due_date: string;
  employee_id: number;
}
