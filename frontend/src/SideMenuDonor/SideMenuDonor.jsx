import React, {useState, useEffect} from "react";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import styles from ".//SideMenuDonor.module.css";
import PinCard from "../PinCard/PinCard.jsx";
import PropTypes from "prop-types";

function SideMenuDonor(props) {
    return (
        <div className={styles.content}>
            <div className={props.pins.length > 0 ? styles.container : styles.containerNoPins}>
                {
                    props.pins.length > 0 ? // this is bad, doesn work because it checks all pins
                    props.pins.map((p) => // isDonor and p.uid === props.uid -> display for donor
                        <>
                            {
                                p.uid === props.uid && props.isDonor ?
                                    <PinCard isDonor={props.isDonor} key={p._id} pin={p} deletePin={props.deletePin} editPin={props.editPin}
                                             _id={p._id} location={p.lat + " " + p.long} date={p.date}
                                             itemTypes={p.itemTypes}></PinCard>
                                    : null
                            }
                        </>
                    )
                        :
                    <div className={styles.noPins}>
                        <p>No Pins Added</p>
                        <button>Add Pin</button>
                    </div>
                }
            </div>
        </div>
    )
}

SideMenuDonor.prototype = {
    pins: PropTypes.array,
    editPin: PropTypes.func,
    deletePin: PropTypes.func,
    isDonor: PropTypes.bool
}

export default SideMenuDonor;