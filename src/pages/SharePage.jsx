import Button from "../components/Button/Button"
import './SharePage.css'
import character_share from "../assets/character_share.png"
import { useNavigate, useParams } from "react-router"

export default function NewPage() {
    const { eventId } = useParams();
    const navigate = useNavigate();

    function copyLink() {
        const url = '참가 링크';
        navigator.clipboard.writeText(url);
    }

    return (
        <div className="main">
            <div className="content sharePage">
                <div className="pageTitle" >
                    <h1>함께할 사람들에게 공유하기</h1>
                    <p>링크만 있으면 누구나 참여 가능해요</p>
                </div>
                <div>
                    <img src={character_share} alt="character" />
                </div>
            </div>
            <div className="buttons">
                <Button onClick={copyLink} text={'링크 복사'} variant="white" />
                <Button onClick={() => navigate(`/participate/${eventId}`)} text={'닉네임 입력하기'} / >
            </div>
        </div>
    )
}