import styles from "./style.module.scss";
import communStyles from "./../../styles/commun.module.scss";
import AlertiIcons from "../../components/AlertiIcons";
import useTranslation from "./../../../i18n";
import ListInput from "../../components/ListInput";
import Radio from "../../components/Radio";

export default ({ onChangeHandler }) => {
    const t = useTranslation()
    return (
        <div className={styles.keywords}>
            <div className={communStyles.alertBloc}>
                <AlertiIcons name={"email"} />
                <h3>{t('email_notification')}</h3>
                <div className={communStyles.notifications}>
                    <Radio name={t('reel_time')} />
                    <Radio name={t('once_day')} />
                    <Radio name={t('once_week')} />
                    <Radio name={t('nothing')} />
                </div>
            </div>
            <div className={communStyles.alertBloc}>
                <AlertiIcons name={"mobile"} />
                <h3>{t('mobile_notification')}</h3>
                <div className={communStyles.notifications}>
                    <Radio name={t('reel_time')} />
                    <Radio name={t('once_day')} />
                    <Radio name={t('once_week')} />
                    <Radio name={t('nothing')} />
                </div>
            </div>
            <div className={communStyles.alertBloc}>
                <AlertiIcons name={"desktop"} />
                <h3>{t('desktop_notification')}</h3>
                <div className={communStyles.notifications}>
                    <Radio name={t('reel_time')} />
                    <Radio name={t('once_day')} />
                    <Radio name={t('once_week')} />
                    <Radio name={t('nothing')} />
                </div>
            </div>
        </div>
    );
}