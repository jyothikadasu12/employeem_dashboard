import { useState, type FormEvent } from "react";
import type { EmployeeFormData } from "../types";

interface Props {
  onSubmit: (data: EmployeeFormData) => Promise<void>;
}

function EmployeeForm({ onSubmit }: Props) {
  const [form, setForm] = useState<EmployeeFormData>({
    name: "",
    email: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      await onSubmit(form);

      setForm({
        name: "",
        email: "",
        department: "",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Add New Employee</h2>
      <p className="form-subtitle">
        Enter the employee information below.
      </p>

      <label>Full Name</label>
      <input
        required
        placeholder="Enter employee name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <label>Email Address</label>
      <input
        required
        type="email"
        placeholder="employee@example.com"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <label>Department</label>
      <input
        required
        placeholder="e.g. Engineering"
        value={form.department}
        onChange={(e) =>
          setForm({ ...form, department: e.target.value })
        }
      />

      <button className="primary-button" disabled={loading}>
        {loading ? "Adding..." : "Add Employee"}
      </button>
    </form>
  );
}

export default EmployeeForm;