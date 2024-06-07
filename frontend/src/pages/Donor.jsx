import React from 'react';
import {useState} from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import NavBar from "../NavBar/navBar.jsx";

function Donor() {
    const [showPopup, setShowPopup] = useState(false);
    const handleMarkerClick = (event) => {
        event.originalEvent.stopPropagation(); // need this to stop propagating close event, https://stackoverflow.com/questions/68783312/show-popup-for-only-one-marker-react-map-gl
        setShowPopup(true)
    }
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
                    <Marker onClick={handleMarkerClick} longitude={2.294694} latitude={48.858093} zIndex={2}></Marker>
                    {
                        showPopup && (<Popup longitude={2.294694} latitude={48.858093}
                                             anchor={"left"}
                                             closeButton={true}
                                             onClose={() => setShowPopup(false)}>
                            <div>You are here</div>
                        </Popup>)
                    }
            </Map>
            <NavBar></NavBar>
        </>
    )
}

export default Donor;