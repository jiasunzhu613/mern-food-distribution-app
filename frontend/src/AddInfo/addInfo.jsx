import React from "react";
import styles from "./addInfo.module.css";


function AddInfo(){
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <form>
                    <label htmlFor={"date"}>Latest Pick-up Date</label><br/>
                    <input type="date" id="date"/><br/>
                    <label htmlFor={"tags"}>Tags</label>


                </form>
            </div>
        </div>)

}

export default AddInfo;