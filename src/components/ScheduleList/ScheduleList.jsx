import './ScheduleList.css';

export default function AppointmentItem({ value, handleFunction, icon, title, placeholder, type, onFocus, onBlur }) {
  return (
    <div className="appointment-card">
      <img src={icon} alt="icon" />
      <div className="appointment-info">
        <p className="appointment-label">{title}</p>
        <input onFocus={onFocus} onBlur={onBlur} value={value} onChange={handleFunction} type={type} className="appointment-value" placeholder={placeholder} />
      </div>
    </div>
  );
}