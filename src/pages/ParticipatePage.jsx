import Button from "../components/Button/Button"
import ParticipantItem from "../components/ParticipantItem/ParticipantItem";
import { useState, useEffect } from "react";
import './ParticipatePage.css'
import icon_profile from "../assets/icon_profile.png"
import { participantData } from "../constants/participantData";
import { useNavigate, useParams } from "react-router";

export default function ParticipatePage() {
    const { eventId } = useParams();
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [participants, setParticipants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getTitle() {
            try {
                /*
                const response = await fetch(url);
                */
                const response = {title: "동아리 약속"}
                setTitle(response.title);
            } catch(error) {
                console.log(error);
            }
        }

        async function getParticipants() {
            try {
                /*
                const response = await fetch(url);
                */
               const response = {data: participantData};
               setParticipants(response.data);
            } catch(error) {
                console.log(error);
            }
        }
        getTitle();
        getParticipants();
    }, [eventId])

    function handleNameChange(e) {
        setName(e.target.value);
    }

    async function formSubmit(e) {
        e.preventDefault();
        if (!name) {
            return;
        }
        const data = {
            nickname: name
        }
        /*
        const result = await fetch('/api/newEvent', {
            method: "POST",
            body: JSON.stringify(data)
        })
        */
        navigate(`/start/${eventId}`)
    }

    return (
        <div className="main">
            <div className="content participatePage">
                <div className="pageTitle">
                    <h1>{title}</h1>
                    <p>닉네임만 정하면 참여할 수 있어요</p>
                </div>
                <div>
                    <div className="participant-card enterName">
                        <img src={icon_profile} alt="icon_profile" />
                        <div className="participant-info">
                            <p className="participant-station">닉네임</p>
                            <form onSubmit={formSubmit} id="nicknameSubmit">
                                <input onChange={handleNameChange} value={name} className="participant-name" type="text" placeholder="닉네임을 입력해 주세요" />
                            </form>
                        </div>
                    </div>
                    {
                        participants.map(function(participant) {
                            return (<ParticipantItem name={participant.name} station={"참여 완료"} />)
                        })
                    }
                </div>
            </div>
            <div className="buttons">
                <Button type={'submit'} form={'nicknameSubmit'} variant={name ? 'blue' : 'gray'} text={'출발지 입력하기'} />
            </div>
        </div>
    )
}