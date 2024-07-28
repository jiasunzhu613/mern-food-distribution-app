import React, {useEffect, useState, useCallback} from "react";
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
    const [loaded, setLoaded] = useState(false);
    const [accepted, setAccepted] = useState([]);

    // Axios requests
    const loadPins = useCallback(async () => {
        axios.get("http://localhost:5555/event")
            .then((p) => setPins(p.data.data))
            .catch((err) => console.log(err));
    }, [])

    const loadUser = useCallback(async (uid) => {
        axios.get(`http://localhost:5555/user/${uid}`)
            .then((u) => {
                setUser(u.data);
                setLoaded(true);
                setAccepted(u.data.accepted);
                // setAccept(u.data.accepted);
                console.log(accepted);
                // console.log(u.data === {});
            })
            .catch((err) => console.log(err));
    }, [])

    useEffect(() => {
        const loadData = async () => {
            await loadPins();
            await loadUser(localStorage.getItem("loginUid"));
        };
        loadData();
    }, [loadPins, loadUser]);

    function acceptPin(uid, eid){
        // setAccept(accept => [...accept, eid]);
        axios.put("http://localhost:5555/user/" + uid, {
                accepted: [...user.accepted, eid]
            })
            .then((res) => {
                // console.log(accept)
                const loadData = async () => {
                    await loadPins();
                    await loadUser(localStorage.getItem("loginUid"));
                };
                loadData();
                document.getElementById(eid).setAttribute("fill", "green")
                // console.log(accept)
                // // console.log("accepted updated")
                console.log(res);
            })
            .catch((err) => console.log(err))
    }

    function removeAcceptedPins(uid, eid) {
        axios.put(`http://localhost:5555/user/${uid}`, {
            accepted: user.accepted.filter(id => id !== eid)
        })
            .then((res) => {
                // console.log(accept)
                // console.log(accept)
                // console.log("remove successful")
                const loadData = async () => {
                    await loadPins();
                    await loadUser(localStorage.getItem("loginUid"));
                };
                loadData();
                document.getElementById(eid).color = "blue"

                console.log(res);
            })
            .catch(err => console.log(err))
    }

    function findEid(arr, eid){
        // console.log("hi " + arr)
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === eid) return i;
        }
        return -1;
    }

    return (
        props.uid !== "" ?
        <>
            {
                loaded ?
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
                                            {/*(findEid(accepted, p._id) !== -1) ? "green" : "blue"*/}
                                            <Marker id={p._id}
                                                style={// TODO: NEEDS A LOT OF FRICKING FIXING (need to get it so its not the bg color that is working)
                                                    {
                                                        backgroundColor: (findEid(accepted, p._id) !== -1) ? "green" : "blue"
                                                    }
                                                }
                                                    longitude={p.long} latitude={p.lat} zIndex={2}
                                                    onClick={(event) => {
                                                        event.originalEvent.stopPropagation(); // need this to stop propagating close event, https://stackoverflow.com/questions/68783312/show-popup-for-only-one-marker-react-map-gl
                                                        setShowPopup({[p._id]: true});
                                                    }
                                                }
                                            >
                                                {
                                                    showPopup[p._id] &&
                                                    <Popup longitude={p.long} latitude={p.lat} anchor={"left"}
                                                           closeButton={true}
                                                           onClose={() => setShowPopup(false)} // TODO: is it possible to have multiple open at once?
                                                    >
                                                        <p>currently logged: {props.uid}</p>
                                                        <div>Latest pick-up date: {p.date}</div>
                                                        <br/>
                                                        <div>Item Types:</div>
                                                        <br/>
                                                        <Tag tags={p.itemTypes} toggleEnabled={false}></Tag><br/>
                                                        {
                                                            findEid(accepted, p._id) !== -1 ?
                                                                <button onClick={
                                                                    // async () => {
                                                                    //     await setAccept(accept => accept.filter(id => id !== p._id));
                                                                    //     await removeAcceptedPins(props.uid, p._id);
                                                                    // }
                                                                    () => {
                                                                        removeAcceptedPins(props.uid, p._id);
                                                                    }
                                                                }>Remove from accepted
                                                                </button>
                                                                :
                                                                <button onClick={() => {
                                                                    // const updateArr = async () => {
                                                                    //     await setAccept(accept => [...accept, p._id]);
                                                                    // };
                                                                    // updateArr();
                                                                    acceptPin(props.uid, p._id);
                                                                }
                                                                }>Accept Posting
                                                                </button>
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
                    </>
                    :
                    <div>
                        loading :)
                    </div>
            }

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