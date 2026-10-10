import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import StatCard from "./components/StatCard";

const stats = [
  { title: "Courses", value: "6", note: "This semester", icon: "📚", color: "#0f766e" },
  { title: "Assignments", value: "12", note: "4 due this week", icon: "📝", color: "#f97316" },
  { title: "Attendance", value: "92%", note: "Above the 75% minimum", icon: "📅", color: "#0ea5e9" },
  { title: "CGPA", value: "8.7", note: "Out of 10", icon: "🎯", color: "#e11d48" },
];

const courses = [
  { name: "Web Technology", code: "CS301", progress: 85, color: "#0f766e" },
  { name: "Database Management", code: "CS302", progress: 70, color: "#f97316" },
  { name: "Machine Learning", code: "CS303", progress: 55, color: "#0ea5e9" },
  { name: "Computer Networks", code: "CS304", progress: 40, color: "#e11d48" },
  { name: "Operating Systems", code: "CS305", progress: 65, color: "#8b5cf6" },
  { name: "Software Engineering", code: "CS306", progress: 30, color: "#eab308" },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [tasks, setTasks] = useState([
    { id: 1, text: "Finish React lab record", done: false },
    { id: 2, text: "Revise SQL joins", done: false },
    { id: 3, text: "Submit DBMS assignment", done: true },
  ]);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const addTask = (event) => {
    event.preventDefault();
    const text = task.trim();
    if (text === "") return;
    setTasks([{ id: Date.now(), text: text, done: false }, ...tasks]);
    setTask("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const visibleTasks = tasks.filter((t) => {
    if (filter === "pending") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  const pendingCount = tasks.filter((t) => !t.done).length;

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Navbar darkMode={darkMode} toggleTheme={() => setDarkMode(!darkMode)} />

      <main className="content">
        <section className="hero" id="home">
          <div className="hero-text">
            <span className="date-pill">{today}</span>
            <h1>
              {greeting}, <em>Jennifer!</em>
            </h1>
            <p>You have {pendingCount} pending tasks and 4 assignments due this week.</p>
          </div>

          <div className="profile-card" id="profile">
            <div className="avatar big">JG</div>
            <h3>Jennifer Grace</h3>
            <p>CSE • Year 3</p>
            <span>Roll No. 101</span>
          </div>
        </section>

        <section className="stats">
          {stats.map((item) => (
            <StatCard
              key={item.title}
              title={item.title}
              value={item.value}
              note={item.note}
              icon={item.icon}
              color={item.color}
            />
          ))}
        </section>

        <section className="panel" id="courses">
          <div className="panel-head">
            <h2>My Courses</h2>
            <span className="count">{courses.length} enrolled</span>
          </div>

          <div className="course-list">
            {courses.map((course) => (
              <div
                className="course-row"
                key={course.code}
                style={{ "--tone": course.color }}
              >
                <div className="course-dot"></div>
                <div className="course-main">
                  <div className="course-top">
                    <strong>{course.name}</strong>
                    <span>{course.progress}%</span>
                  </div>
                  <small>{course.code}</small>
                  <div className="bar">
                    <div
                      className="bar-fill"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel" id="tasks">
          <div className="panel-head">
            <h2>My Tasks</h2>
            <span className="count">{pendingCount} pending</span>
          </div>

          <form className="task-form" onSubmit={addTask}>
            <input
              type="text"
              placeholder="What do you need to do?"
              value={task}
              onChange={(event) => setTask(event.target.value)}
            />
            <button type="submit" className="add-btn">
              + Add Task
            </button>
          </form>

          <div className="tabs">
            {["all", "pending", "done"].map((name) => (
              <button
                key={name}
                className={filter === name ? "tab active" : "tab"}
                onClick={() => setFilter(name)}
              >
                {name}
              </button>
            ))}
          </div>

          <ul className="task-list">
            {visibleTasks.map((t) => (
              <li key={t.id} className={t.done ? "task done" : "task"}>
                <label>
                  <input
                    type="checkbox"
                    checked={t.done}
                    onChange={() => toggleTask(t.id)}
                  />
                  <span>{t.text}</span>
                </label>
                <button
                  className="remove"
                  onClick={() => deleteTask(t.id)}
                  aria-label="Delete task"
                >
                  🗑
                </button>
              </li>
            ))}
            {visibleTasks.length === 0 && (
              <p className="empty">Nothing here. Enjoy the calm ✨</p>
            )}
          </ul>
        </section>

        <footer className="footer">Designed for Jennifer Grace • React + Vite</footer>
      </main>
    </div>
  );
}

export default App;