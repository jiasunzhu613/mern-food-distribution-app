import React, {useState} from "react";
import styles from "./AddInfo.module.css";
import Tag from "../Tag/Tag.jsx";
import PropTypes from "prop-types";


const tagNames = ["Canned food", "Spilable food"]
function AddInfo(props){
    const [tags, setTags] = useState(tagNames);
    const [activeTags, setActiveTags] = useState([]);

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
        return new Date(document.getElementById("date").value)

    }

    function handleSubmit(){
        props.addPin(props.lngLat, calcDate(), activeTags);
        props.toggleAddInfo(false);
    }

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor={"date"}>Latest Pick-up Date</label><br/>
                    <input type="date" id="date" defaultValue={"today"}/><br/>
                    <label htmlFor={"tags"}>Tags</label>
                    <Tag tags={tags} isActive={isActive} addTag={addTag} removeTag={removeTag} toggleEnabled={true}></Tag>
                    <input type="submit"></input>
                </form>
            </div>
        </div>)

}

AddInfo.prototype = {
    lngLat: PropTypes.array,
    addPin: PropTypes.func,
    toggleAddInfo: PropTypes.func
}

export default AddInfo;