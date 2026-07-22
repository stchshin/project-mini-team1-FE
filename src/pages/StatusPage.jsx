import Button from "../components/Button/Button"
import ParticipantItem from "../components/ParticipantItem/ParticipantItem";
import Popup from "../components/Popup/Popup";
import character_loading from "../assets/character_loading.png"
import { useContext, useEffect, useState } from "react";
import './StatusPage.css'
import { profileData } from "../constants/profileData";
import { EventContext } from "../App";
import { useNavigate, useParams } from "react-router";
import axiosInstance from "../api/axiosInstance";

export default function StatusPage() {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const { setResults } = useContext(EventContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [participantStatus, setParticipantStatus] = useState([]);

    useEffect(() => {
        async function getParticipantStatus() {
            try {
                const response = await axiosInstance.get(
                    `/appointments/${eventId}/origins`
                )
                
                setParticipantStatus(response.data);
            } catch(error) {
                console.log(error.response.data);
            }
        }
    
        getParticipantStatus();

        if (!loading) {
            const interval = setInterval(getParticipantStatus, 3000);
            return () => clearInterval(interval);
        }
    }, [eventId, loading])

    async function readyButtonClick() {
        try {
            setLoading(true);
            const response = await axiosInstance.post(
                `/appointments/${eventId}/recommendations`
            )  
            
            if (response.status == 200) {
                setLoading(false);
                setResults(response.data.recommendations);
                navigate(`/result/${eventId}`)
            } else {
                setLoading(false);
                console.log(response.data);
            }
        } catch (error) {
            if (error.response.status == 409) {
                setError(true);
            }
            console.log(error.response.data);
        }
    }

    if (loading) {
            return (
                <div className="main">
                    <div className="content mainPage loadingPage">
                        <div>
                            <img src={character_loading} alt="character_loading" />
                            <div>
                                <p><span>중간 지점</span>을 찾는 중</p>
                                <div>
                                    <p>대중교통 이동시간을</p>
                                    <p>비교하고 있어요</p>
                                </div>
                            </div>
                        </div>
                        <div className="circles">
                            <div className="circle" style={{animationDelay: '0s'}}></div>
                            <div className="circle" style={{animationDelay: '1s'}}></div>
                            <div className="circle" style={{animationDelay: '2s'}}></div>
                        </div>
                    </div>
                </div>
            )
        }

    return (
        <div className="main">
            <Popup visibility={error} />
            <div className="content participatePage">
                <div className="pageTitle">
                    <h1>출발지 입력 현황</h1>
                </div>
                <div>
                    {
                        participantStatus.map(function(participant) {
                            const colour = profileData[participantStatus.indexOf(participant) % 4];
                            return (<ParticipantItem colour={colour} name={participant.name} station={participant.origin} />)
                        })
                    }
                </div>
            </div>
            <div className="buttons">
                <Button onClick={readyButtonClick} variant={'blue'} text={'추천 시작'} />
            </div>
        </div>
    )
}