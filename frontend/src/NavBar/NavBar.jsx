import styles from "./NavBar.module.css";
import profileImg from "../assets/react.svg";


const NavBar = () => {
    return (
        <div className={styles.nav}>
            <a href={"/"}><img src={profileImg} alt="profileImage" className={styles.profileImg}/></a>
            <a href={"/"}><img src={profileImg} alt="profileImage" className={styles.profileImg}/></a>
        </div>
    )
}

export default NavBar;