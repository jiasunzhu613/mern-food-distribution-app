import React, {useEffect, useState} from "react";
import Map, {Marker, Popup} from 'react-map-gl';
import axios from "axios";
import NavBar from "../NavBar/NavBar.jsx";
import SideMenuDonor from "../SideMenuDonor/SideMenuDonor.jsx";
import Tag from "../Tag/Tag.jsx";
import PropTypes from "prop-types";

/*
What need?:
1. display on the map pins that DID NOT originate from logged in user
2. clicking pins will give the user about information regarding the posting and allow the user to collect the posting
3. side bar will also provide users with information about all the postings and allow them to accept as well
 */
const Recipient = (props) => {
    const [showPopup, setShowPopup] = useState({});
    const [pins, setPins] = useState([]);
    const [user, setUser] = useState([]);
    const [accept, setAccept] = useState([]);

    useEffect(() => {
        loadPins();
    }, []);

    useEffect(() => {
        loadUser(localStorage.getItem("loginUid"));
    }, [])

    // Axios requests
    function loadPins(){
        axios.get("http://localhost:5555/event")
            .then((p) => setPins(p.data.data))
            .catch((err) => console.log(err));
    }

    function loadUser(uid){
        console.log(props.uid);
        console.log(`http://localhost:5555/user/${uid}`)
        axios.get(`http://localhost:5555/user/${uid}`)
            .then((u) => {
                setUser(u.data);
                // setLoaded(true);
                setAccept(u.data.accepted);
                console.log(u.data);
                // console.log(u.data === {});
            })
            .catch((err) => console.log(err));
    }

    function acceptPin(uid, eid){
        axios.put("http://localhost:5555/user/" + uid, {
                accepted: accept
            })
            .then((res) => {
                loadUser(localStorage.getItem("loginUid"));
                loadPins();
                console.log("accepted updated")
                console.log(res);
            })
            .catch((err) => console.log(err))
    }

    function removeAcceptedPins(uid, eid) {
        axios.put(`http://localhost:5555/user/${uid}`, {
            accepted: accept
        })
            .then((res) => {
                loadUser(localStorage.getItem("loginUid"));
                loadPins();
                console.log(res);
            })
            .catch(err => console.log(err))
    }

    function findEid(arr, eid){
        console.log("hi " + arr)
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === eid) return i;
        }
        return -1;
    }

    return (
        props.uid !== "" ?
        <>
             <Map
                mapboxAccessToken={process.env.REACT_APP_MAPBOX}
                initialViewState={{
                    longitude: 2.294694,
                    latitude: 48.858093,
                    zoom: 1 // add this into local storaged
                }}
                style={{width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0, zIndex: -1}}
                mapStyle="mapbox://styles/mapbox/streets-v9">
                {
                    pins.map((p) =>
                        p.uid !== props.uid ?
                            <div key={p._id}>
                                <Marker color={(findEid(accept, p._id) !== -1)? "green" : "blue"} longitude={p.long} latitude={p.lat} zIndex={2}
                                        onClick={(event) =>
                                            {
                                                event.originalEvent.stopPropagation(); // need this to stop propagating close event, https://stackoverflow.com/questions/68783312/show-popup-for-only-one-marker-react-map-gl
                                                setShowPopup({[p._id]: true});
                                            }
                                        }>
                                    {
                                        showPopup[p._id] &&
                                        <Popup longitude={p.long} latitude={p.lat} anchor={"left"}
                                               closeButton={true}
                                               onClose={() => setShowPopup(false)} // TODO: is it possible to have multiple open at once?
                                        >
                                            <p>currently logged: {props.uid}</p>
                                            <div>Latest pick-up date: {p.date}</div> <br/>
                                            <div>Item Types:</div><br/>
                                            <Tag tags={p.itemTypes} toggleEnabled={false}></Tag><br/>
                                            {
                                                (findEid(accept, p._id)) !== -1 ? <button onClick={
                                                        () => {
                                                            setAccept(accept => accept.filter(id => id !== p._id))
                                                            removeAcceptedPins(props.uid, p._id)
                                                        }
                                                    }>Remove from accepted</button>
                                                    : <button onClick={
                                                        () => {
                                                            setAccept([p._id, ...accept])
                                                            acceptPin(props.uid, p._id)
                                                        }
                                                    }>Accept Posting</button>
                                            }
                                        </Popup>
                                    }
                                </Marker>
                            </div> : null
                    )
                }
            </Map>
            <SideMenuDonor isDonor={false} pins={pins} acceptPin={acceptPin}></SideMenuDonor>
            <NavBar isDonor={false} logout={props.logout}></NavBar>
        </> :
            <div>
                hi not logged in :(
            </div>
    )
}

Recipient.prototype = {
    uid: PropTypes.string,
    logout: PropTypes.func
}

export default Recipient;