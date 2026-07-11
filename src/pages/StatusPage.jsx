import Button from "../components/Button/Button"
import ParticipantItem from "../components/ParticipantItem/ParticipantItem";
import Popup from "../components/Popup/Popup";
import { useEffect, useState } from "react";
import './StatusPage.css'
import { useNavigate, useParams } from "react-router";
import { participantData } from "../constants/participantData";

export default function StatusPage() {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [popup, setPopup] = useState(false);
    const [participantStatus, setParticipantStatus] = useState([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        async function getParticipantStatus() {
            try {
                /*
                const response = await fetch(url);
                */
               const response = {data: participantData, ready: 'ready'};
               if (response.ready == 'ready') {
                    setReady(true);
                }
               setParticipantStatus(response.data);
            } catch(error) {
                console.log(error);
            }
        }

        if (ready) {
            return;
        }

        getParticipantStatus();
        const interval = setInterval(getParticipantStatus, 3000);
        return () => clearInterval(interval);
    }, [eventId])

    async function readyButtonClick() {
        if (!ready) {
            setError('notReady');
            setPopup(true);
            return;
        }

        /*
        const response = await fetch(url);
        */
        const response = { startedAlready: false }
        
        if (response.startedAlready) {
            setError('startedAlready');
            setPopup(true);
        } else {
            navigate(`/result/${eventId}`)
        }
    }

    return (
        <div className="main">
            <Popup visibility={popup} error={error} setPopup={setPopup} />
            <div className="content participatePage">
                <div className="pageTitle">
                    <h1>출발지 입력 현황</h1>
                </div>
                <div>
                    {
                        participantStatus.map(function(participant) {
                            return (<ParticipantItem name={participant.name} station={participant.station} />)
                        })
                    }
                </div>
            </div>
            <div className="buttons">
                <Button onClick={readyButtonClick} variant={ready ? 'blue' : 'gray'} text={'추천 시작'} />
            </div>
        </div>
    )
}