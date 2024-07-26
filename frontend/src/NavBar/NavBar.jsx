import styles from "./NavBar.module.css";
import profileImg from "../assets/react.svg";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';


function NavBar(props) {
    // const navigate = useNavigate();

    return (
        <div>
            {/*<div className={styles.openSideMenu}>*/}
            {/*    <KeyboardDoubleArrowRightIcon className={""}></KeyboardDoubleArrowRightIcon>*/}
            {/*</div>*/}
            <div className={styles.nav}>
                <a href={props.isDonor ? "/recipient" : "/donor"}><img src={profileImg} alt="profileImage" className={styles.profileImg}/></a>
                <a onClick={() => props.logout()}><img src={profileImg} alt="profileImage" className={styles.profileImg}/></a>
            </div>
        </div>
    )
}

NavBar.prototype = {
    isDonor: PropTypes.bool,
    logout: PropTypes.func
}

export default NavBar;