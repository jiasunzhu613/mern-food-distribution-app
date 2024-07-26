import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import styles from "../SideMenuToggleButton/SideMenuToggleButton.module.css";

function SideMenuToggleButton() {
    return (
        <a className={styles.arrow}>
            <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>
        </a>
    )
}

export default SideMenuToggleButton;