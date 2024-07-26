import React, {useState, useEffect} from "react";
import styles from "./AddInfo.module.css";
import Tag from "../Tag/Tag.jsx";
import PropTypes from "prop-types";


const tagNames = ["Canned food", "Spoilable food"]
function AddInfo(props){
    const [tags, setTags] = useState(tagNames);
    const [activeTags, setActiveTags] = useState(props.activeTags);

    function addTag(t = null){
        setActiveTags([...activeTags, t]);
    }

    function removeTag(t = null){
        setActiveTags(tags => tags.filter(tag => tag !== t))
    }

    function isActive(t){
        return activeTags.includes(t);
    }

    function calcDate(){
        return document.getElementById("date").value
    }

    function handleSubmit(){
        if (calcDate().toString() === "Invalid Date"){
            alert("Please enter a date");
            return false;
        }
        if (activeTags.length === 0){
            alert("Please add a tag");
            return false;
        }

        if (props.activeTags.length === 0)
            props.addPin(props.lngLat, calcDate(), activeTags);
        else
            props.updatePin(props.id, calcDate(), activeTags);

        props.toggleAddInfo(false);
        return true;
    }

    function loadDate(){
        document.getElementById("date").value = props.date;
    }

    useEffect(() => {
        loadDate();
    }, [])

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <form>
                    <label htmlFor={"date"}>Latest Pick-up Date</label><br/>
                    <input type="date" id="date" placeholder={new Date().toISOString().slice(0, 10)}/><br/>
                    <label htmlFor={"tags"}>Tags</label>
                    <Tag tags={tags} isActive={isActive} addTag={addTag} removeTag={removeTag} toggleEnabled={true}></Tag>
                    <button type="button" onClick={handleSubmit}>Submit</button>
                </form>
                <button type="button" onClick={() => props.toggleAddInfo(false)}>Close</button>
            </div>
        </div>)

}

AddInfo.prototype = {
    lngLat: PropTypes.array,
    addPin: PropTypes.func,
    updatePin: PropTypes.func,
    toggleAddInfo: PropTypes.func,
    date: PropTypes.String,
    itemTypes: PropTypes.array,
    id: PropTypes.number
}

export default AddInfo;