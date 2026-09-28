function Navbar({ darkMode, toggleTheme }) {
  return (
    <nav className="navbar">
      <h2>🎓 EduDashboard</h2>

      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#courses">Courses</a>
        <a href="#tasks">Tasks</a>
        <a href="#profile">Profile</a>
      </div>

      <div className="nav-right">
        <button className="profile-btn" onClick={toggleTheme}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
        <img className="avatar" src="./images/profile.jpg" alt="Student profile" />
      </div>
    </nav>
  );
}

export default Navbar;
