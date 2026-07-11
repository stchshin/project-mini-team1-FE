import Button from "../components/Button/Button"
import character_main from "../assets/character_main.png"
import './MainPage.css'
import { useNavigate } from "react-router"

export default function MainPage() {
    const navigate = useNavigate();

    return (
        <div className="main">
            <div className="content mainPage">
                <div>
                    <img src={character_main} alt="" />
                    <div>
                        <p>"우리, <span>중간</span>에서 보자"</p>
                        <p>대충 정한 중간 말고, 모두에게 공평한 곳으로</p>
                    </div>
                </div>
            </div>
            <div className="buttons">
                <Button onClick={() => navigate('/new')} text={'약속 만들기'} />
            </div>
        </div>
    )
}