
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  BriefcaseBusiness,
} from "lucide-react";

import "../styles/layout.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <BriefcaseBusiness size={23} />
        </div>

        <div>
          <h2>Explore</h2>
          <p>Workspace</p>
        </div>
      </div>

      <p className="nav-heading">WORKSPACE</p>

      <nav className="sidebar-nav">
        <NavLink to="/" end className="nav-link">
          <LayoutDashboard size={19} />
          Dashboard
        </NavLink>

        <NavLink to="/employees" className="nav-link">
          <Users size={19} />
          Employees
        </NavLink>

        <NavLink to="/tasks" className="nav-link">
          <ClipboardList size={19} />
          Tasks
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <div className="profile-avatar">ET</div>
        <div>
          <strong>Admin</strong>
          <p>Workspace Manager</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
