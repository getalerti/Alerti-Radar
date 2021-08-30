import AlertiIcons from "./AlertiIcons";
import useTranslation from "../../i18n";
import styles from "./../styles/commun.module.scss"

export default ({ name, active, onClick }) => {
    const t = useTranslation();
    return (
        <div className={styles.monitorType} data-active={active} onClick={onClick}>
            <AlertiIcons name={name} />
            <span>{t(name)}</span>
        </div>
    )
}