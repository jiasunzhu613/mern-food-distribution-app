import styles from "./PinCardRecipient.module.css";
import PropTypes from "prop-types";

function arrayToString(arr){
    let ret = "";
    for (let i = 0; i < arr.length - 1; i++) {
        ret += arr[i] + ", ";
    }
    ret += arr[arr.length - 1]
    return ret;
}
function PinCardRecipient(props) {
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <p className={styles.text}>Location: {props.location}</p>
                <p className={styles.text}>Latest Pick-up Date: {props.date}</p>
                <p className={styles.text}>Item Types: {arrayToString(props.itemTypes)}</p>
                <button onClick={() => {
                    props.acceptPin(props._id);
                }}>Accept</button>
            </div>
        </div>
    )
}

PinCardRecipient.prototype = {
    _id: PropTypes.string,
    location: PropTypes.string,
    date: PropTypes.string,
    itemTypes: PropTypes.array,
    acceptPin: PropTypes.func,
    pin: PropTypes.array
}

export default PinCardRecipient;