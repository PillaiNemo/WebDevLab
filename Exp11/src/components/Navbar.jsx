import { useState } from "react";

const links = [
  { label: "Home", icon: "🏠" },
  { label: "Courses", icon: "📖" },
  { label: "Tasks", icon: "✔️" },
  { label: "Profile", icon: "👤" },
];

function Navbar({ darkMode, toggleTheme }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sidebar">
      <div className="sidebar-top">
        <div className="brand">
          <span className="brand-mark">E</span>
          <div>
            <h2>EduDash</h2>
            <small>Student Portal</small>
          </div>
        </div>
        <button
          className="menu-btn"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      <div className={open ? "side-menu open" : "side-menu"}>
        <div className="side-links">
          {links.map((link) => (
            <a
              key={link.label}
              href={`#${link.label.toLowerCase()}`}
              onClick={() => setOpen(false)}
            >
              <span>{link.icon}</span>
              {link.label}
            </a>
          ))}
        </div>

        <div className="side-bottom">
          <button className="theme-switch" onClick={toggleTheme}>
            <span>{darkMode ? "Dark mode" : "Light mode"}</span>
            <span className={darkMode ? "switch on" : "switch"}>
              <span className="knob"></span>
            </span>
          </button>

          <div className="user">
            <div className="avatar">JG</div>
            <div>
              <strong>Jennifer Grace</strong>
              <small>Student</small>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;