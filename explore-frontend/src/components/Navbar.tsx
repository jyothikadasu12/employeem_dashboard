
import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");

  const titles: Record<string, string> = {
    "/": "Dashboard",
    "/employees": "Employee Management",
    "/tasks": "Task Management",
  };

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();

    if (!search.trim()) return;

    navigate(
      `/employees?search=${encodeURIComponent(search.trim())}`
    );

    setShowSearch(false);
  };

  return (
    <header className="topbar">
      <div>
        <p className="breadcrumb">EXPLORE / WORKSPACE</p>
        <h1>{titles[location.pathname] || "Workspace"}</h1>
      </div>

      <div className="topbar-actions">
        {showSearch && (
          <form className="navbar-search" onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Search employees..."
              value={search}
              autoFocus
              onChange={(e) => setSearch(e.target.value)}
            />

            <button type="submit" aria-label="Submit search">
              <Search size={17} />
            </button>
          </form>
        )}

        <button
          className="icon-button"
          aria-label="Search employees"
          onClick={() => setShowSearch(!showSearch)}
        >
          {showSearch ? <X size={19} /> : <Search size={19} />}
        </button>


        <div className="topbar-avatar">A</div>
      </div>
    </header>
  );
}

export default Navbar;
