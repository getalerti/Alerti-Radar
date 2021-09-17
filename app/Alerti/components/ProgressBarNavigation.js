import styles from "./../styles/commun.module.scss"
import useTranslation from "../../i18n";
import consts from "../helpers/consts";

export default ({steps, activeStep}) => {
    const t = useTranslation();
    return (
        <ul className={styles.progressBarNavigation}>
            {
                steps.map(step => (
                    step !== consts.alert_success_form ? (
                        <li key={step} data-active={activeStep === step || steps.indexOf(step) <= steps.indexOf(activeStep)} >
                            <span>{t(step)}</span>
                        </li>
                    ) : <></>

                ))
            }
        </ul>
    )
}