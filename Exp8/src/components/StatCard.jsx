// Reusable card: the data comes in through props
function StatCard({ icon, title, value }) {
  return (
    <div className="card">
      <span className="card-icon">{icon}</span>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}

export default StatCard;
