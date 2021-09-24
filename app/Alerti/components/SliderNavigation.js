import styles from "./../styles/commun.module.scss"
import useTranslation from "../../helpers/i18n";

export default ({ next, prev, display = true, isLast = false, isFirst = false, disableNext = false }) => {
    const t = useTranslation();
    if (!display)
        return <></>;
    return (
        <div className={styles.alertiNavigationContainer}>
            <button onClick={prev}>
                {t('prev')}
            </button>
            <button onClick={!disableNext ? next : null} disabled={disableNext}>
                {
                    isLast ? t('validate') : t('next')
                }
            </button>
        </div>
    )
}