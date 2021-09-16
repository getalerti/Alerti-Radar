import styles from "./../styles/commun.module.scss"
import AlertiIcons from "./AlertiIcons";

export default () => {
    return (
        <div className={styles.spinner}>
            <AlertiIcons name={"spinner"} />
        </div>
    )
}