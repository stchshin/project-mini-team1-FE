import Button from "../components/Button/Button"
import LocationItem from "../components/LocationItem/LocationItem"
import './StartPage.css'
import icon_cancel from '../assets/icon_cancel.png'
import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router";
import { searchLocation } from "../api/kakao";
import { EventContext } from "../App";
import axiosInstance from "../api/axiosInstance";

export default function StartPage() {
    const { eventId } = useParams();
    const { nickname } = useContext(EventContext);
    const [locationInput, setLocationInput] = useState('');
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState({id: null});
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
                console.log(error.response.data);
                alert("위치 정보를 가져올 수 없습니다.");
            }
        );
    }, []);

    function handleLocationInputChange(e) {
        setLocationInput(e.target.value);
    }

    function handleCancelInput() {
        setLocationInput('');
        setData([]);
    }

    async function handleForm(e) {
        e.preventDefault();
        if (!locationInput) {
            return;
        }

        try {
            const result = await searchLocation(locationInput, currentLocation);

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
        } catch (error) {
            console.log(error.response.data);
        }

        setSelected({ id: null });
    }

    function handleSelected(e) {
        setSelected({ id: e.currentTarget.dataset.id, name: e.currentTarget.dataset.name, x: e.currentTarget.dataset.x, y: e.currentTarget.dataset.y});
    }

    async function formSubmit(e) {
        e.preventDefault();

        if (!selected.x || !selected.y) {
            return;
        }
        
        try {
            await axiosInstance.post(
                `/appointments/${eventId}/origins`,
                {
                    name: nickname,
                    origin: selected.name,
                    latitude: Number(Number(selected.y).toFixed(6)),
                    longitude: Number(Number(selected.x).toFixed(6))
                }
            )

            navigate(`/status/${eventId}`)
        } catch (error) {
            console.log(error.response.data);
        }
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
                            if (location.id == selected.id) {
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
                <Button type={'submit'} form={'locationSubmit'} text={'이 출발지로 확정'} variant={selected.x || selected.y ? 'blue' : 'gray'} />
            </div>
        </div>
    )
}