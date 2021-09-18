import styles from "./../styles/commun.module.scss"
import AlertiIcons from "./AlertiIcons";

export default ({position}) => {
    return (
        <div className={styles.spinner} position={position}>
            <AlertiIcons name={"spinner"} />
        </div>
    )
}