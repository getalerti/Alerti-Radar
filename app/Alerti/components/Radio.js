import styles from "./../styles/commun.module.scss"
import {useState} from "react";
import { GiPlainCircle } from "react-icons/gi";
import AlertiIcons from "./AlertiIcons";
export default ({ icon = "", name, checked = false, onchange = () => {}}) => {
    const handleChange = () => {
        onchange();
    }
    return (
        <div className={styles.radio}  onClick={handleChange}>
            <span data-checked={checked}>
                {checked && <GiPlainCircle />}
            </span>
            <p>
                {icon !== "" && <AlertiIcons name={icon} />}
                <span>{name}</span>
            </p>
        </div>
    )
}