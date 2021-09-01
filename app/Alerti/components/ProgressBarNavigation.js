import styles from "./../styles/commun.module.scss"
import useTranslation from "../../i18n";

export default ({steps, activeStep}) => {
    const t = useTranslation();
    return (
        <ul className={styles.progressBarNavigation}>
            {
                steps.map(step => (
                    <li key={step} data-active={activeStep === step || steps.indexOf(step) <= steps.indexOf(activeStep)} >
                        <span>{t(step)}</span>
                    </li>
                ))
            }
        </ul>
    )
}