import styles from "./PinCard.module.css";
import PropTypes from "prop-types";

function arrayToString(arr){
    let ret = "";
    for (let i = 0; i < arr.length - 1; i++) {
        ret += arr[i] + ", ";
    }
    ret += arr[arr.length - 1]
    return ret;
}
function PinCard(props) {
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <p className={styles.text}>Location: {props.location}</p>
                <p className={styles.text}>Latest Pick-up Date: {props.date}</p>
                <p className={styles.text}>Item Types: {arrayToString(props.itemTypes)}</p>
                <button onClick={() => {
                    props.editPin(props.pin);
                }}>Edit</button>
                <button onClick={() => {
                    props.deletePin(props._id);
                }}>Delete</button>
            </div>
        </div>
    )
}

PinCard.prototype = {
    _id: PropTypes.string,
    location: PropTypes.string,
    date: PropTypes.string,
    itemTypes: PropTypes.array,
    editPin: PropTypes.func,
    pin: PropTypes.array,
    deletePin: PropTypes.func
}

export default PinCard;