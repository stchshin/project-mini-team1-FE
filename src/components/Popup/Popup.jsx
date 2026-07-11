import './Popup.css';
import Button from '../Button/Button';
import icon_warning from '../../assets/icon_warning.png'
import { useNavigate, useParams } from 'react-router';

export default function Popup({visibility, error, setPopup}) {
  const navigate = useNavigate();
  const { eventId } = useParams();

  function handleError() {
    if (error == 'startedAlready') {
      navigate(`/result/${eventId}`);
    } else {
      setPopup(false);
    }
    
  }

  return (
    <div style={visibility ? {display: "flex"} : {display: "none"}} className='popupBg'>
        <div className='popup'>
            <div>
                <img src={icon_warning} alt="icon_warning" />
                {
                  error == 'notReady' ? <p>아직 모든 참가자가 출발지를 입력하지 않았습니다</p> : <p>이미 추천이 시작되었습니다</p>
                }
                
            </div>
            <Button onClick={handleError} text={"확인"}/>
        </div>
    </div>
  );
}