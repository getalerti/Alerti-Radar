import styles from "./alert.module.scss"
import { FaSpinner } from 'react-icons/fa';

export default ({ type, message, loader = false }) => {
    const icon = loader ? <FaSpinner  className={styles.alert_loader} /> : <></>
    return <div className={styles.alert} data-type={type}>
        {icon}
        {message}
    </div>
}