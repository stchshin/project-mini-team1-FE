import character_result from "../assets/character_result.png"
import Button from "../components/Button/Button"
import ResultCard from "../components/ResultCard/ResultCard"
import './ResultPage.css'
import { EventContext } from "../App"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import axiosInstance from "../api/axiosInstance"

export default function ResultPage() {
    const { eventId } = useParams();
    const { results } = useContext(EventContext);
    const [title, setTitle] = useState('');
    const [datetime, setDatetime] = useState('');
    const [newResults, setNewResults] = useState([]);

    async function getInfo() {
        try {
            const response = await axiosInstance.get(
                `/appointments/${eventId}/status`
            )
            setTitle(response.data.title);

            const dateData = new Date(response.data.dateTime);
            const dateFormat = dateData.toLocaleString('ko-KR', {
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            })
            setDatetime(dateFormat);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function getResults() {
        try {
            const response = await axiosInstance.get(
                `/appointments/${eventId}/recommendations`
            )
            const sortedResults = [...response.data].sort((a, b) => (b.is_recommended ? 1 : 0) - (a.is_recommended ? 1 : 0));
            setNewResults(sortedResults);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getInfo();
        if (!results) {
            getResults();
        } else {
            setNewResults(results);
        }
    }, [eventId])

    function copyLink() {
        const url = window.location;
        navigator.clipboard.writeText(url);
    }

    return (
        <div className="main">
            <div className="content resultPage">
                <div className="event">
                    <p><span className="check">✓</span> {datetime} _ {title}</p>
                </div>
                <div className="resultImage">
                    <img src={character_result} alt="character_result" />
                    <h1>추천 완료!</h1>
                    <p>이동 시간이 비슷한 상위 3곳이에요</p>
                </div>
                <div className="resultCards">
                    {
                        newResults.map(function(result) {
                            return (
                                <ResultCard result={result} />
                            )
                        })
                    }
                </div>
            </div>
            <div className="buttons">
                <Button onClick={copyLink} variant={'blue'} text={'링크로 결과 공유'} />
            </div>
        </div>
    )
}