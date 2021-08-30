import styles from "./../styles/commun.module.scss"
import useTranslation from "../../i18n";

export default ({steps, activeStep}) => {
    const t = useTranslation();
    return (
        <ul className={styles.progressBarNavigation}>
            {
                steps.map(step => (
                    <li data-active={activeStep === step} >
                        <span>{t(step)}</span>
                    </li>
                ))
            }
        </ul>
    )
}