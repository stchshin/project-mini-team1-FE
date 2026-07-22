import './Popup.css';
import Button from '../Button/Button';
import icon_warning from '../../assets/icon_warning.png'
import { useNavigate, useParams } from 'react-router';

export default function Popup({visibility}) {
  const navigate = useNavigate();
  const { eventId } = useParams();

  function handleError() {
    navigate(`/result/${eventId}`);
  }

  return (
    <div style={visibility ? {display: "flex"} : {display: "none"}} className='popupBg'>
        <div className='popup'>
            <div>
                <img src={icon_warning} alt="icon_warning" />
                <p>이미 추천이 시작되었습니다</p>
            </div>
            <Button onClick={handleError} text={"확인"}/>
        </div>
    </div>
  );
}