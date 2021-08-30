import styles from "./style.module.scss";
import communStyles from "./../../styles/commun.module.scss";
import AlertiIcons from "../../components/AlertiIcons";
import useTranslation from "./../../../i18n";
import ListInput from "../../components/ListInput";

export default ({ onChangeHandler }) => {
    const t = useTranslation()
    return (
        <div className={styles.keywords}>
            <div className={communStyles.alertBloc}>
                <AlertiIcons name={"name"} />
                <input type={"text"} placeholder={t('alert_name') + " *"} />
            </div>
            <div className={communStyles.alertBloc}>
                <AlertiIcons name={"keywords"} />
                <h3>{t('included_keywords')}</h3>
                <ListInput />
            </div>
            <div className={communStyles.alertBloc}>
                <AlertiIcons name={"keywords"} />
                <h3>{t('excluded_keywords')}</h3>
                <ListInput />
            </div>
        </div>
    );
}