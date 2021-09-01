import styles from "./../styles/commun.module.scss"
import useTranslation from "../../i18n";

export default ({ next, prev, display = true, isLast = false, isFirst = false }) => {
    const t = useTranslation();
    if (!display)
        return <></>;
    return (
        <div className={styles.alertiNavigationContainer}>
            <button onClick={prev}>
                {t('prev')}
            </button>
            <button onClick={next}>
                {
                    isLast ? t('validate') : t('next')
                }
            </button>
        </div>
    )
}