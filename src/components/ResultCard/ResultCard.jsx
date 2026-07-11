import './ResultCard.css';
import { useState } from 'react';
import icon_unfold from '../../assets/icon_unfold.png';
import icon_fold from '../../assets/icon_fold.png';
import { colourData } from '../../constants/colourData';

export default function ResultCard({ result }) {
    const [clicked, setClicked] = useState(false);

    function handleButtonClick(e) {
        clicked ? setClicked(false) : setClicked(true);
    }

    return (
    <div className="resultCard">
        <div className='firstRow'>
            <div>
                <div className='station'>{result.name}</div>
                <div className='lines'>
                    {
                        result.lines.map(function(line) {
                            return (
                                <div style={{backgroundColor: colourData[line]}}>{line}</div>
                            )
                        })
                    }
                </div>
            </div>
            <div style={result.id != 1 ? {display: 'none'} : {} } className='recommended'>추천</div>
        </div>
        <div className='secondRow'>
            <div>
                <div><span className='thinner'>이동시간</span> {result.totalTime}분</div>
                <div><span className='thinner'>환승</span> {result.meanTransfer}회</div>
            </div>
            <button onClick={handleButtonClick}><img src={clicked ? icon_fold : icon_unfold} alt="icon_unfold" /></button>
        </div>
        <div style={clicked ? {display: 'flex'} : {display: 'none'}} className='resultDetail'>
            {
                result.participants.map(function(participant) {
                    const percent = participant.duration / result.longest * 100
                    return (
                        <div>
                            <div>{participant.name}</div>
                            <div className='progressBar'>
                                <div className='progress' style={{width: percent + '%' }} ></div>
                            </div>
                            <div>{participant.duration}분</div>
                        </div>
                    )
                })
            }
        </div>
    </div>
    );
    }