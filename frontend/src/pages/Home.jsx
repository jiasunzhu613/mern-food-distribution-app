import React from "react";
import PropTypes from "prop-types";

const Home = (props) => {
    return (
        <div>
           hi {props.user}
        </div>
    )
}

Home.prototype = {
    user: PropTypes.string
}
export default Home