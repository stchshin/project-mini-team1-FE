import Button from "../components/Button/Button"
import LocationItem from "../components/LocationItem/LocationItem"
import './StartPage.css'
import icon_cancel from '../assets/icon_cancel.png'
import { useState, useEffect } from 'react';
import { mydata } from '../constants/locationData'
import { useNavigate, useParams } from "react-router";
import { searchLocation } from "../api/kakao";


export default function StartPage() {
    const { eventId } = useParams();
    const [locationInput, setLocationInput] = useState('');
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(null);
    const navigate = useNavigate();
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            alert("이 브라우저는 위치 정보를 지원하지 않습니다.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCurrentLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                console.log(error);
                alert("위치 정보를 가져올 수 없습니다.");
            }
        );
    }, []);

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

        if (!currentLocation) {
            alert("현재 위치를 불러오는 중입니다.");
            return;
        }


        try {
            const result = await searchLocation(locationInput, currentLocation);

            console.log(result); 

            const locations = result.map((item) => ({
            id: item.id,
            name: item.place_name,
            address: item.road_address_name || item.address_name,
            distance: `${(Number(item.distance) / 1000).toFixed(1)}km`,
            x: item.x,
            y: item.y,
            isSubway: item.category_group_name === "지하철역"
        }));

            setData(locations);
            setSelected(null);
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
                                    <LocationItem key={location.id} handleSelected={handleSelected} location={location} isSelected={false} />
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