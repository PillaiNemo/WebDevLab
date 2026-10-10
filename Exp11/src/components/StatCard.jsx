function StatCard({ title, value, note, icon, color }) {
  return (
    <div className="stat" style={{ "--tone": color }}>
      <div className="stat-head">
        <h3>{title}</h3>
        <span className="stat-icon" style={{ background: `${color}22` }}>
          {icon}
        </span>
      </div>
      <p className="stat-value">{value}</p>
      <small className="stat-note">{note}</small>
    </div>
  );
}

export default StatCard;