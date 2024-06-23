import React, {useState} from "react";
import styles from "../AddPin/AddPin.module.css";
import {AddLocation} from "@mui/icons-material";
import PropTypes from "prop-types";

function AddPin(props){
    // user left click: place pin
    // user right click: cancel action
    function handleAddPin(){
        props.wantsToAddPin(true);
    }

    return (
        <div className={styles.container}>
            <div onClick={handleAddPin} className={styles.cButton}>
                <AddLocation className={styles.cIcon}></AddLocation>
            </div>
        </div>
    );
}

AddPin.prototype = {
    wantsToAddPin: PropTypes.func
}
export default AddPin;