import { useState } from "react";

function Navbar({ darkMode, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Home", "Courses", "Tasks", "Profile"];

  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-icon">🎓</span>
        <h2>EduDashboard</h2>
      </div>

      <div className={menuOpen ? "nav-links open" : "nav-links"}>
        {links.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
          >
            {link}
          </a>
        ))}
      </div>

      <div className="nav-actions">
        <button
          className="icon-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
        <div className="avatar">AK</div>
        <button
          className="icon-btn menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
