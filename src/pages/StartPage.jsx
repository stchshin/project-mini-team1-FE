import Button from "../components/Button/Button"
import LocationItem from "../components/LocationItem/LocationItem"
import './StartPage.css'
import icon_cancel from '../assets/icon_cancel.png'
import { useState } from 'react';
import { mydata } from '../constants/locationData'
import { useNavigate, useParams } from "react-router";

export default function StartPage() {
    const { eventId } = useParams();
    const [locationInput, setLocationInput] = useState('');
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(null);
    const navigate = useNavigate();

    function handleLocationInputChange(e) {
        setLocationInput(e.target.value);
    }

    function handleCancelInput(e) {
        setLocationInput('');
        setData([]);
    }

    async function handleForm(e) {
        e.preventDefault();
        if (!locationInput) {
            return;
        }

        try {
            /*
            const response = await fetch(url);
            */
            const response = {data: mydata}
            setData(response.data);
        } catch(error) {
            console.log(error);
        }

        setSelected(null);
    }

    function handleSelected(e) {
        setSelected(e.currentTarget.dataset.id);
    }

    async function formSubmit(e) {
        e.preventDefault();

        if (!selected) {
            return;
        }
        const data = {
            location: selected
        }
        /*
        const result = await fetch('/api/newEvent', {
            method: "POST",
            body: JSON.stringify(data)
        })
        */
        navigate(`/status/${eventId}`)
    }

    return (
        <div className="main">
            <div className="content startPage">
                <div className="pageTitle">
                    <h1>출발지가 어디인가요?</h1>
                </div>
                <form id="searchForm" onSubmit={handleForm} >
                    <input value={locationInput} onChange={handleLocationInputChange} type="text" name="location" />
                    <button onClick={handleCancelInput} type="button"><img src={icon_cancel} alt="cancel" /></button>
                </form>
                <form onSubmit={formSubmit} id="locationSubmit" className="locations">
                    {
                        data.map(function(location) {
                            if (location.id == selected) {
                                return (
                                    <LocationItem key={location.id} handleSelected={handleSelected} location={location} isSelected={true} />
                                )
                            } else {
                                return (
                                    <LocationItem handleSelected={handleSelected} location={location} isSelected={false} />
                                )
                            }
                        })
                    }
                </form>
            </div>
            <div className="buttons">
                <Button type={'submit'} form={'locationSubmit'} text={'이 출발지로 확정'} variant={selected ? 'blue' : 'gray'} />
            </div>
        </div>
    )
}