import React, {useState, useEffect}  from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import NavBar from "../NavBar/navBar.jsx";
import axios from "axios";

function Donor() {
    const [showPopup, setShowPopup] = useState({});
    const [pins, setPins] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5555/event")
            .then(p => setPins(p.data.data))
            .catch(err => console.log(err));
    }, []);

    // console.log(pins.map((p) => console.log(p._id)))
    return (
        <>
            <Map
                mapboxAccessToken={process.env.REACT_APP_MAPBOX}
                initialViewState={{
                    longitude: 2.294694,
                    latitude: 48.858093,
                    zoom: 14
                }}
                style={{width: "100vw", height: "100vh", position: "fixed", top: 0, zIndex: -1}}
                mapStyle="mapbox://styles/mapbox/streets-v9">

                {
                    //TODO: should add keys
                    pins.map((p) =>
                        <div key={p._id}>
                            <Marker onClick={(event) => {
                                event.originalEvent.stopPropagation(); // need this to stop propagating close event, https://stackoverflow.com/questions/68783312/show-popup-for-only-one-marker-react-map-gl
                                setShowPopup({[p._id]:true});}}
                                    longitude={p.long} latitude={p.lat} zIndex={2}></Marker>
                            {
                                showPopup[p._id] && (<Popup longitude={p.long} latitude={p.lat}
                                anchor={"left"}
                                closeButton={true}
                                onClose={() => setShowPopup(false)}>
                                <div>You are here</div>
                                </Popup>)
                            }
                        </div>
                    )
                }
            </Map>
            <NavBar></NavBar>
        </>
    )
}

export default Donor;