import React from "react";
import styles from "../Tag/Tag.module.css";
import PropTypes from "prop-types";

function Tag(props) {
    return (
        <div className={styles.container}>
            {
                props.tags.map((tag) =>
                    props.isActive(tag) ?
                    <div className={styles.button} onClick={() => {
                        // event.originalEvent.stopPropagation();
                        props.removeTag(tag)}
                    }>
                        <h2 className={styles.tag}>{tag}</h2>
                    </div> :
                    <div className={`${styles.button} ${styles.disabled}`} onClick={() => {
                        // event.originalEvent.stopPropagation();
                        props.addTag(tag)}}>
                        <h2 className={styles.tag}>{tag}</h2>
                    </div>

                )
            }
        </div>
    )
}

Tag.prototype = {
    tag: PropTypes.array,
    addTag: PropTypes.func,
    removeTag: PropTypes.func,
    isActive: PropTypes.func
}

export default Tag