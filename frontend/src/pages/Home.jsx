import React, {useState} from "react";
import PropTypes from "prop-types";
import AddPin from "../AddPin/AddPin.jsx";
import AddInfo from "../AddInfo/AddInfo.jsx";
import Tag from "../Tag/Tag.jsx";
import SideMenuDonor from "../SideMenuDonor/SideMenuDonor.jsx";

const tagNames = ["Canned food", "Spoilable food"]
const Home = (props) => {
    const [tags, setTags] = useState(tagNames);
    const [activeTags, setActiveTags] = useState([]);

    // tagNames.forEach((tag) => setTags([...tags, tag]))

    function addTag(t = null){
        setActiveTags([...activeTags, t]);
    }

    function removeTag(t = null){
        setActiveTags(tags => tags.filter(tag => tag !== t))
    }

    function isActive(t){
        return activeTags.includes(t);
    }

    return (
        // <Tag tags={tags} isActive={isActive} addTag={addTag} removeTag={removeTag}></Tag>
        // <AddInfo></AddInfo>
        // <AddPin></AddPin>
        // <div>
        //    hi {props.user}
        // </div>
        <SideMenuDonor></SideMenuDonor>
    )
}

Home.prototype = {
    user: PropTypes.string
}
export default Home