import './ResultCard.css';
import { useState } from 'react';
import icon_unfold from '../../assets/icon_unfold.png';
import icon_fold from '../../assets/icon_fold.png';
import { colourData } from '../../constants/colourData';

export default function ResultCard({ result }) {
    const [clicked, setClicked] = useState(false);

    const longest = Math.max(...result.participants.map(p => p.time));

    function handleButtonClick() {
        clicked ? setClicked(false) : setClicked(true);
    }

    function isNumeric(str) {
        return str.trim() !== "" && !isNaN(Number(str));
    }

    return (
    <div className="resultCard">
        <div className='firstRow'>
            <div>
                <div className='station'>{result.station}역</div>
                <div className='lines'>
                    {
                        result.lines.map(function(line) {
                            let lineName;
                            if (line == '경원선') {
                                lineName = '경의중앙'
                            }
                            if (isNumeric(line[0])) {
                                lineName = line[0];
                            }

                            return (
                                <div style={{backgroundColor: colourData[lineName] || '#5498FF'}}>{lineName}</div>
                            )
                        })
                    }
                </div>
            </div>
            <div style={result.is_recommended ? {} : {display: 'none'} } className='recommended'>추천</div>
        </div>
        <div className='secondRow'>
            <div>
                <div><span className='thinner'>평균 이동시간</span> {result.average_time}분</div>
            </div>
            <button onClick={handleButtonClick}><img src={clicked ? icon_fold : icon_unfold} alt="icon_unfold" /></button>
        </div>
        <div style={clicked ? {display: 'flex'} : {display: 'none'}} className='resultDetail'>
            {
                result.participants.map(function(participant) {
                    const percent = participant.time / longest * 100
                    return (
                        <div>
                            <div>{participant.name}</div>
                            <div className='progressBar'>
                                <div className='progress' style={{width: percent + '%' }} ></div>
                            </div>
                            <div>{participant.time}분</div>
                        </div>
                    )
                })
            }
        </div>
    </div>
    );
    }