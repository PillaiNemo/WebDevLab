import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import StatCard from "./components/StatCard";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const courses = [
    { name: "Web Technology", image: "web.jpg" },
    { name: "Database Management", image: "database.jpg" },
    { name: "Machine Learning", image: "ml.jpg" },
    { name: "Computer Networks", image: "network.jpg" },
  ];

  function addTask() {
    if (task === "") {
      alert("Please enter a task");
      return;
    }
    setTasks([...tasks, task]);
    setTask("");
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Navbar darkMode={darkMode} toggleTheme={() => setDarkMode(!darkMode)} />

      <main className="dashboard">
        <section
          className="welcome"
          id="home"
          style={{ backgroundImage: 'url("./images/banner.jpg")' }}
        >
          <h1>Welcome Back!</h1>
          <p>Here is your academic overview.</p>
        </section>

        <section className="cards">
          <StatCard icon="📚" title="Courses" value="6" />
          <StatCard icon="📝" title="Assignments" value="12" />
          <StatCard icon="✅" title="Attendance" value="92%" />
          <StatCard icon="🏆" title="CGPA" value="8.7" />
        </section>

        <section className="course-section" id="courses">
          <h2>My Courses</h2>

          <div className="course-list">
            {courses.map((course, index) => (
              <div className="course-item" key={index}>
                <img src={"./images/" + course.image} alt={course.name} />
                <span>{course.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="task-section" id="tasks">
          <h2>Add Task</h2>

          <input
            type="text"
            placeholder="Enter a task"
            value={task}
            onChange={(event) => setTask(event.target.value)}
          />
          <button onClick={addTask}>Add</button>

          <ul className="task-list">
            {tasks.map((t, index) => (
              <li key={index}>{t}</li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="footer" id="profile">
        © 2026 EduDashboard · Built with ReactJS
      </footer>
    </div>
  );
}

export default App;
