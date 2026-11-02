
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

import {
  getEmployees,
  createEmployee,
  deleteEmployee,
} from "../services/api";

import type {
  Employee,
  EmployeeFormData,
} from "../types";

import "../styles/employees.css";

function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const loadEmployees = async () => {
    try {
      setEmployees(await getEmployees());
      setError("");
    } catch {
      setError("Unable to fetch employees.");
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleAdd = async (data: EmployeeFormData) => {
    try {
      await createEmployee(data);
      setSuccess("Employee added successfully!");
      await loadEmployees();
    } catch (error: any) {
      throw new Error(
        error.response?.data?.detail || "Unable to add employee."
      );
    }
  };

  const handleDelete = async (id: number) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this employee and their tasks?"
      )
    ) {
      return;
    }

    try {
      await deleteEmployee(id);
      setSuccess("Employee deleted successfully!");
      await loadEmployees();
    } catch {
      setError("Unable to delete employee.");
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const query = search.toLowerCase();

    return (
      employee.name.toLowerCase().includes(query) ||
      employee.email.toLowerCase().includes(query) ||
      employee.department.toLowerCase().includes(query)
    );
  });

  return (
    <div className="page-content">
      <div className="page-intro">
        <div>
          <span className="welcome-label">TEAM MANAGEMENT</span>
          <h2>Employees</h2>
          <p>
            Add and manage your organization members.
          </p>
        </div>

        <div className="employee-total">
          <strong>{filteredEmployees.length}</strong>
          <span>Members</span>
        </div>
      </div>

      {search && (
        <div className="search-result-info">
          Showing results for: <strong>{search}</strong>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="employee-layout">
        <EmployeeForm onSubmit={handleAdd} />

        <EmployeeList
          employees={filteredEmployees}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default Employees;
