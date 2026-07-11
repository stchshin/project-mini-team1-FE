import character_loading from "../assets/character_loading.png"
import character_result from "../assets/character_result.png"
import Button from "../components/Button/Button"
import ResultCard from "../components/ResultCard/ResultCard"
import './ResultPage.css'
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { recommendationData } from "../constants/recommendationData"

export default function ResultPage() {
    const { eventId } = useParams();
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [datetime, setDatetime] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        async function getInfo() {
            try {
                /*
                const response = await fetch(url);
                */
                const response = {title: "동아리 세션 후 회식🍻", datetime: "7월 22일 19:00"}
                setTitle(response.title);
                setDatetime(response.datetime);
            } catch(error) {
                console.log(error);
            }
        }

        async function getResults() {
            try {
                /*
                const response = await fetch(url);
                */
                const response = {data: recommendationData};
                setResults(response.data);
            } catch(error) {
                console.log(error);
            }
        }
        getInfo();
        getResults();
        setLoading(false);
    }, [eventId])

    function copyLink() {
        const url = '결과 링크';
        navigator.clipboard.writeText(url);
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
                        results.map(function(result) {
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