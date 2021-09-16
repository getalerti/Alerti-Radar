import styles from "./style.module.scss";
import useTranslation from "./../../../i18n";
import AlertiIcons from "../../components/AlertiIcons";

export default ({  }) => {
    const t = useTranslation();

    return (
        <div className={styles.alertSuccess}>
            <h2>
                {t('alert_created_successfully')}
            </h2>
            <AlertiIcons name={"success"} />
        </div>
    );
}