import styles from "./style.module.scss";
import useTranslation from "./../../../i18n";
import AlertiIcons from "../../components/AlertiIcons";
import {useContext, useEffect} from "react";
import {Context} from "../../context";
import Loader from "../../components/Loader";
import consts from "../../helpers/consts";

export default () => {
    const t = useTranslation();
    const {state} = useContext(Context);
    return (
        <div className={styles.alertSuccess}>
            <h2>
                {
                    state.submittingRequest === "DONE" ? t('alert_created_successfully') : t('alert_submitting_progress')
                }
            </h2>
            {
                state.submittingRequest === "DONE" ? <AlertiIcons name={"success"} /> : <Loader />
            }

        </div>
    );
}