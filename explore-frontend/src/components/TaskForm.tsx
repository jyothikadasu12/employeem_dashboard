import { useState } from "react";
import type { SyntheticEvent } from "react";
import type {
  Employee,
  TaskFormData,
} from "../types";

interface Props {
  employees: Employee[];
  onSubmit: (data: TaskFormData) => Promise<void>;
}

function TaskForm({ employees, onSubmit }: Props) {
  const [form, setForm] = useState<TaskFormData>({
    title: "",
    description: "",
    priority: "Medium",
    due_date: "",
    employee_id: 0,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.employee_id) return;

    setLoading(true);

    try {
      await onSubmit(form);

      setForm({
        title: "",
        description: "",
        priority: "Medium",
        due_date: "",
        employee_id: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Create New Task</h2>
      <p className="form-subtitle">
        Assign work to an employee.
      </p>

      <label>Task Title</label>
      <input
        required
        placeholder="Enter task title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <label>Description</label>
      <textarea
        placeholder="Describe the task..."
        rows={3}
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <label>Priority</label>
      <select
        value={form.priority}
        onChange={(e) =>
          setForm({
            ...form,
            priority: e.target.value as TaskFormData["priority"],
          })
        }
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <label>Due Date</label>
      <input
        type="date"
        required
        min={new Date().toISOString().split("T")[0]}
        value={form.due_date}
        onChange={(e) =>
          setForm({ ...form, due_date: e.target.value })
        }
      />

      <label>Assign Employee</label>
      <select
        required
        value={form.employee_id || ""}
        onChange={(e) =>
          setForm({
            ...form,
            employee_id: Number(e.target.value),
          })
        }
      >
        <option value="">Select employee</option>

        {employees.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {employee.name}
          </option>
        ))}
      </select>

      <button
        className="primary-button"
        disabled={loading || employees.length === 0}
      >
        {loading ? "Creating..." : "Create Task"}
      </button>

      {employees.length === 0 && (
        <p className="form-hint">
          Add an employee before creating a task.
        </p>
      )}
    </form>
  );
}

export default TaskForm;