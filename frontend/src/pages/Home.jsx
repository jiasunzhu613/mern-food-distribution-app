import React from "react";
import PropTypes from "prop-types";
import AddPin from "../AddPin/AddPin.jsx";
import AddInfo from "../AddInfo/addInfo.jsx";

const Home = (props) => {
    return (
        <AddInfo></AddInfo>
        // <AddPin></AddPin>
        // <div>
        //    hi {props.user}
        // </div>
    )
}

Home.prototype = {
    user: PropTypes.string
}
export default Home