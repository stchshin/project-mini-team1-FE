import './LocationItem.css';
import icon_location from '../../assets/icon_location.png'
import icon_selected from '../../assets/icon_selected.png'

export default function LocationItem({ handleSelected, location, isSelected }) {
  return (
    <button data-id={location.id} type='button' className={`location-card ${isSelected ? 'selected' : ''}`} onClick={handleSelected} >
        <div>
          <img src={icon_location} alt="icon_location" />
          <div className="location-texts">
            <h4 className="location-title">{location.name}</h4>
            <p className='location-detail'>{location.distance}・{location.address}</p>
          </div>
        </div>
        <img className={isSelected ? 'selectedIcon' : ''} src={icon_selected} alt="icon_selected" />
    </button>
  );
}