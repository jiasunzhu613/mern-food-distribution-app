import React, {useState, useEffect}  from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import NavBar from "../NavBar/NavBar.jsx";
import AddPin from "../AddPin/AddPin.jsx";
import axios from "axios";
import PropTypes from "prop-types";
import AddInfo from "../AddInfo/AddInfo.jsx";

function Donor(props) {
    const [showPopup, setShowPopup] = useState({});
    const [pins, setPins] = useState([]);
    const [wantToAddPin, setWantToAddPin] = useState(false);
    const [showAddInfo, setShowAddInfo] = useState(false);
    const [lngLat, setLnglat] = useState([]);

    useEffect(() => {
        loadPins();
        }, []);

    function wantsToAddPin(w = false){
        setWantToAddPin(w);
    }

    function toggleAddInfo(boo = false) {
        setShowAddInfo(boo);
    }

    // Axios requests
    function loadPins(){
        axios.get("http://localhost:5555/event")
            .then(p => setPins(p.data.data))
            .catch(err => console.log(err));
    }

    function addPin(lngLat, date, items){
        console.log(lngLat);
        axios.post("http://localhost:5555/event", {
            user: props.user,
            lat: lngLat.lat,
            long: lngLat.lng,
            date: date,
            itemTypes: items})
            .then((res) => {
                setWantToAddPin(false);
                loadPins();
                console.log(res)
            }).catch((err) => console.log(err));}

    function deletePin(id){
        axios.delete(`http://localhost:5555/event/${id}`)
            .then((res) => {
                loadPins();
                console.log(res)
            })
            .catch((err) => console.log(err));
    }

    return (
        props.user !== "" ?
        <>
            {showAddInfo ?
            <AddInfo lngLat={lngLat} addPin={addPin} setShowAddInfo={toggleAddInfo}></AddInfo> : <></>}
            <Map
                onClick={(e) => {
                    if (wantToAddPin){
                        setShowAddInfo(true);
                        setLnglat(e.lngLat);
                    }
                }}
                mapboxAccessToken={process.env.REACT_APP_MAPBOX}
                initialViewState={{
                    longitude: 2.294694,
                    latitude: 48.858093,
                    zoom: 14
                }}
                style={{width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0, zIndex: -1}}
                mapStyle="mapbox://styles/mapbox/streets-v9">

                {
                    pins.map((p) =>
                            p.user === props.user ?
                            <div key={p._id}>
                                <Marker onClick={(event) => {
                                    event.originalEvent.stopPropagation(); // need this to stop propagating close event, https://stackoverflow.com/questions/68783312/show-popup-for-only-one-marker-react-map-gl
                                    setShowPopup({[p._id]: true});
                                }} longitude={p.long} latitude={p.lat} zIndex={2}></Marker>
                                {
                                    showPopup[p._id] &&
                                    (
                                        <Popup longitude={p.long} latitude={p.lat}
                                               anchor={"left"}
                                               closeButton={true}
                                               onClose={() => setShowPopup(false)}>
                                            <div>You are here</div>
                                            <button onClick={() => deletePin(p._id)}>{p._id}</button>
                                        </Popup>
                                    )
                                }
                            </div> : null
                    )
                }
            </Map>
            <NavBar></NavBar>
            <AddPin wantsToAddPin={wantsToAddPin}></AddPin>
        </> :
            <div>
                hi not logged in :(

            </div>
    )
}

Donor.prototype = {
    user: PropTypes.string
}

export default Donor;