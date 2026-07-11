import './ParticipantItem.css';

export default function ParticipantItem({ name, station }) {
  const initial = name ? name.charAt(0) : '';

  return (
    <div className="participant-card">
      <div className="participant-avatar">
        {initial}
      </div>
      <div className="participant-info">
        <h4 className="participant-name">{name}</h4>
        <p className="participant-station">{station}</p>
      </div>
    </div>
  );
}