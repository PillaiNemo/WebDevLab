import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import StatCard from "./components/StatCard";

const stats = [
  { title: "Courses", value: "6", icon: "📚", color: "#4f46e5" },
  { title: "Assignments", value: "12", icon: "📝", color: "#f59e0b" },
  { title: "Attendance", value: "92%", icon: "✅", color: "#10b981" },
  { title: "CGPA", value: "8.7", icon: "🏆", color: "#ec4899" },
];

const courses = [
  { name: "Web Technology", progress: 85 },
  { name: "Database Management", progress: 70 },
  { name: "Machine Learning", progress: 55 },
  { name: "Computer Networks", progress: 40 },
  { name: "Operating Systems", progress: 65 },
  { name: "Software Engineering", progress: 30 },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([
    { id: 1, text: "Complete React lab record", done: false },
    { id: 2, text: "Submit DBMS assignment", done: true },
  ]);

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  const pendingCount = tasks.filter((t) => !t.done).length;

  const addTask = (event) => {
    event.preventDefault();
    const text = task.trim();
    if (text === "") return;
    setTasks([...tasks, { id: Date.now(), text: text, done: false }]);
    setTask("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Navbar darkMode={darkMode} toggleTheme={() => setDarkMode(!darkMode)} />

      <main className="dashboard">
        <section className="welcome" id="home">
          <div>
            <h1>Welcome Back, Arun! 👋</h1>
            <p>Here is your academic overview for this semester.</p>
          </div>
          <div className="profile-chip" id="profile">
            <div className="avatar large">AK</div>
            <div>
              <strong>Arun Kumar</strong>
              <span>CSE • Year 3 • Roll No. 101</span>
            </div>
          </div>
        </section>

        <section className="cards">
          {stats.map((item) => (
            <StatCard
              key={item.title}
              title={item.title}
              value={item.value}
              icon={item.icon}
              color={item.color}
            />
          ))}
        </section>

        <section className="course-section" id="courses">
          <div className="section-head">
            <h2>My Courses</h2>
            <input
              type="text"
              className="search"
              placeholder="🔍 Search courses..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="course-list">
            {filteredCourses.map((course) => (
              <div className="course-item" key={course.name}>
                <div className="course-top">
                  <span>{course.name}</span>
                  <strong>{course.progress}%</strong>
                </div>
                <div className="progress">
                  <div
                    className="progress-fill"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
            {filteredCourses.length === 0 && (
              <p className="empty">No courses found.</p>
            )}
          </div>
        </section>

        <section className="task-section" id="tasks">
          <div className="section-head">
            <h2>My Tasks</h2>
            <span className="badge">{pendingCount} pending</span>
          </div>

          <form className="task-form" onSubmit={addTask}>
            <input
              type="text"
              placeholder="Enter a task"
              value={task}
              onChange={(event) => setTask(event.target.value)}
            />
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>

          <ul className="task-list">
            {tasks.map((t) => (
              <li key={t.id} className={t.done ? "task-item done" : "task-item"}>
                <label>
                  <input
                    type="checkbox"
                    checked={t.done}
                    onChange={() => toggleTask(t.id)}
                  />
                  <span>{t.text}</span>
                </label>
                <button
                  className="delete-btn"
                  onClick={() => deleteTask(t.id)}
                  aria-label="Delete task"
                >
                  ✕
                </button>
              </li>
            ))}
            {tasks.length === 0 && (
              <p className="empty">No tasks yet. Add one above!</p>
            )}
          </ul>
        </section>
      </main>

      <footer className="footer">
        EduDashboard • Built with ReactJS + Vite
      </footer>
    </div>
  );
}

export default App;
