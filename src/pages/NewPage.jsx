import Button from "../components/Button/Button"
import ScheduleList from "../components/ScheduleList/ScheduleList"
import { useState } from "react"
import './NewPage.css'
import icon_title from "../assets/icon_title.png"
import icon_date from "../assets/icon_date.png"
import { useNavigate } from "react-router"

export default function NewPage() {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [clicked, setClicked] = useState(false);
    const selected = title.length > 0 && date.length > 0;
    const navigate = useNavigate();

    function handleDateClick() {
        setClicked(true);
    }

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleDateChange(e) {
        setDate(e.target.value);
    }

    async function formSubmit(e) {
        e.preventDefault();
        if (!selected) {
            return;
        }
        const data = {
            title: title,
            date: date
        }
        /*
        const result = await fetch('/api/newEvent', {
            method: "POST",
            body: JSON.stringify(data)
        })
        */
        const result = {eventId: 1};
        navigate(`/share/${result.eventId}`)
    }

    return (
        <div className="main">
            <div className="content newPage">
                <div className="pageTitle">
                    <h1><span>새 약속</span> 시작하기</h1>
                    <p>약속 이름과 날짜, 시간을 정하며 시작해볼까요?</p>
                </div>
                <form onSubmit={formSubmit} id="newEvent">
                    <ScheduleList value={title} handleFunction={handleTitleChange} icon={icon_title} title={"약속명"} placeholder={"약속명을 입력해 주세요"} type={"text"} />
                    <ScheduleList clicked={clicked} onClick={handleDateClick} value={date} handleFunction={handleDateChange} icon={icon_date} title={"날짜 / 시간"} type={"datetime-local"} />
                </form>
            </div>
            <div className="buttons">
                <Button type={'submit'} form={'newEvent'} variant={selected ? 'blue' : 'gray'} text={'약속 생성 완료'} />
            </div>
        </div>
    )
}