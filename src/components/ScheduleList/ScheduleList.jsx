import './ScheduleList.css';

export default function AppointmentItem({ clicked, onClick, value, handleFunction, icon, title, placeholder, type }) {
  return (
    <div className="appointment-card">
      <img src={icon} alt="icon" />
      <div className="appointment-info">
        <p className="appointment-label">{title}</p>
        <p onClick={onClick} className='dateLabel' style={title == '날짜 / 시간' && clicked == false ? {display: 'flex'} : {display: 'none'}}>
          아직 미정이에요
        </p>
        {(title != '날짜 / 시간' || clicked) && (
          <input value={value} onChange={handleFunction} type={type} className="appointment-value" placeholder={placeholder} />
        )}
      </div>
    </div>
  );
}