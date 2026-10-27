
import {
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
} from "react-icons/fi";

function StatCard({ title, value, type }) {
  
  let icon = <FiBookOpen />;
  let cardClass = "total";
  let description = "Books in your library";

  if (type === "available") {
    icon = <FiCheckCircle />;
    cardClass = "available";
    description = "Ready to borrow";
  } else if (type === "issued") {
    icon = <FiClock />;
    cardClass = "issued";
    description = "Currently borrowed";
  }

  return (
    <div className={`stat-card ${cardClass}`}>
      <div className="stat-card-content">
        <p className="stat-card-title">{title}</p>

        <h2 className="stat-card-value">{value}</h2>

        <div className="stat-card-description">
          <FiTrendingUp />

          <span>{description}</span>
        </div>
      </div>

      <div className="stat-card-icon">
        {icon}
      </div>
    </div>
  );
}

export default StatCard;
