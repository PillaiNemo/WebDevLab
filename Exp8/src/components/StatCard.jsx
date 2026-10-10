function StatCard({ title, value, icon, color }) {
  return (
    <div className="card">
      <div
        className="card-icon"
        style={{ background: `${color}22`, color: color }}
      >
        {icon}
      </div>
      <div className="card-info">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
}

export default StatCard;
