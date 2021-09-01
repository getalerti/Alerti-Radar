import styles from "./../styles/commun.module.scss"
import {useState} from "react";
import { FcCheckmark } from "react-icons/fc";
import AlertiIcons from "./AlertiIcons";
export default ({ icon = "", name, checked = false, onchange = () => {}}) => {
    const handleChange = () => {
        onchange();
    }
    return (
        <div className={styles.checkbox}  onClick={handleChange}>
            <span data-checked={checked}>
                {checked && <FcCheckmark />}
            </span>
            <p>
                {icon !== "" && <AlertiIcons name={icon} />}
                <span>{name}</span>
            </p>
        </div>
    )
}