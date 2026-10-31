import { Trash2, UserRound } from "lucide-react";
import type { Employee } from "../types";

interface Props {
  employees: Employee[];
  onDelete: (id: number) => void;
}

function EmployeeList({ employees, onDelete }: Props) {
  return (
    <div className="table-card">
      <div className="section-heading">
        <div>
          <h2>Employee Directory</h2>
          <p>Manage your organization members</p>
        </div>

        <span className="count-badge">
          {employees.length} Members
        </span>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>EMPLOYEE</th>
              <th>EMAIL</th>
              <th>DEPARTMENT</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>
                  <div className="employee-name">
                    <div className="employee-avatar">
                      <UserRound size={17} />
                    </div>
                    {employee.name}
                  </div>
                </td>

                <td>{employee.email}</td>
                <td>
                  <span className="department-badge">
                    {employee.department}
                  </span>
                </td>

                <td>
                  <button
                    className="delete-button"
                    aria-label={`Delete ${employee.name}`}
                    onClick={() => onDelete(employee.id)}
                  >
                    <Trash2 size={17} />
                  </button>
                </td>
              </tr>
            ))}

            {employees.length === 0 && (
              <tr>
                <td colSpan={4} className="empty-state">
                  No employees found. Add your first employee.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;