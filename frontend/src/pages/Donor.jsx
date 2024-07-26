import React, {useState, useEffect}  from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import axios from "axios";
import PropTypes from "prop-types";
import NavBar from "../NavBar/NavBar.jsx";
import AddPin from "../AddPin/AddPin.jsx";
import AddInfo from "../AddInfo/AddInfo.jsx";
import Tag from "../Tag/Tag.jsx";
import SideMenuDonor from "../SideMenuDonor/SideMenuDonor.jsx";

function Donor(props) {
    const [showPopup, setShowPopup] = useState({});
    const [pins, setPins] = useState([]);
    const [wantToAddPin, setWantToAddPin] = useState(false);
    const [showAddInfo, setShowAddInfo] = useState(false);
    const [lngLat, setLnglat] = useState([]);
    const [activeTags, setActiveTags] = useState([]);
    const [date, setDate] = useState("");
    const [id, setId] = useState("");

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
            uid: props.uid,
            lat: lngLat.lat,
            long: lngLat.lng,
            date: date,
            itemTypes: items})
            .then((res) => {
                setWantToAddPin(false);
                loadPins();
                console.log(res)
            }).catch((err) => console.log(err));
    }

    function editPin(p){
        setActiveTags(p.itemTypes);
        setDate(p.date);
        setId(p._id);
        setShowAddInfo(true);
    }

    function updatePin(id, date, items){ //TODO: add update lng lat
        axios.put(`http://localhost:5555/event/${id}`, {
            date: date,
            itemTypes: items
            })
            .then((res) => {
                loadPins();
                setActiveTags([]);
                setDate("");
                setId("");
                console.log(res);
            })
            .catch((err) => console.log(err));
    }

    function deletePin(id){
        axios.delete(`http://localhost:5555/event/${id}`)
            .then((res) => {
                loadPins();
                console.log(res)
            })
            .catch((err) => console.log(err));
    }

    return (
        props.uid !== "" ?
        <>
            {showAddInfo ?
            <AddInfo lngLat={lngLat} addPin={addPin} updatePin={updatePin} toggleAddInfo={toggleAddInfo} activeTags={activeTags} date={date} id={id}></AddInfo> : null
            }

            <Map
                onClick={(e) => {
                    if (wantToAddPin){
                        setLnglat(e.lngLat);
                        setShowAddInfo(true);
                    }
                }}
                mapboxAccessToken={process.env.REACT_APP_MAPBOX}
                initialViewState={{
                    longitude: 2.294694,
                    latitude: 48.858093,
                    zoom: 14 // add this into local storage
                }}
                style={{width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0, zIndex: -1}}
                mapStyle="mapbox://styles/mapbox/streets-v9">

                {
                    pins.map((p) =>
                            p.uid === props.uid ?
                            <div key={p._id}>
                                <Marker onClick={(event) => {
                                    event.originalEvent.stopPropagation(); // need this to stop propagating close event, https://stackoverflow.com/questions/68783312/show-popup-for-only-one-marker-react-map-gl
                                    setShowPopup({[p._id]: true});
                                }} longitude={p.long} latitude={p.lat} zIndex={2} style={{borderWidth: "20px"}}></Marker>
                                {
                                    showPopup[p._id] &&
                                    (
                                        <Popup longitude={p.long} latitude={p.lat}
                                               anchor={"left"}
                                               closeButton={true}
                                               onClose={() => setShowPopup(false)}>
                                            <div>Latest pick-up date: {p.date}</div> <br/>
                                            <div>Item Types:</div><br/>
                                            <Tag tags={p.itemTypes} toggleEnabled={false}></Tag><br/>
                                            <button onClick={
                                                () => {
                                                    editPin(p);
                                                }
                                            }
                                            >Edit Pin</button>
                                            <button onClick={() => deletePin(p._id)}>Delete Pin</button>
                                        </Popup>
                                    )
                                }
                            </div> : null
                    )
                }
            </Map>
            <SideMenuDonor isDonor={true} pins={pins} editPin={editPin} deletePin={deletePin} uid={props.uid}></SideMenuDonor>
            <NavBar isDonor={true} logout={props.logout}></NavBar>
            <AddPin wantsToAddPin={wantsToAddPin}></AddPin>
        </> :
            <div>
                hi not logged in :(
            </div>
    )
}

Donor.prototype = {
    uid: PropTypes.string
}

export default Donor;