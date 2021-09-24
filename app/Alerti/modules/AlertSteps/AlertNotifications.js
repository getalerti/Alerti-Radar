import styles from "./style.module.scss";
import communStyles from "./../../styles/commun.module.scss";
import AlertiIcons from "../../components/AlertiIcons";
import useTranslation from "../../../helpers/i18n";
import ListInput from "../../components/ListInput";
import Radio from "../../components/Radio";
import {useContext, useState} from "react";
import {Context} from "../../context";
import SliderNavigation from "../../components/SliderNavigation";
import consts from "../../helpers/consts";

export default ({ onChangeHandler }) => {
    const t = useTranslation();
    const {state, dispatch} = useContext(Context);
    const currentStepIndex = state.steps.indexOf(state.activeStep);

    const [emailNotification, setEmailNotification] = useState(consts.defaultEmailNotification);
    const [mobileNotification, setMobileNotification] = useState(consts.defaultMobileNotification);
    const [desktopNotification, setDesktopNotification] = useState(consts.defaultDesktopNotification);
    const validate = () => {
        dispatch({type: "REQUEST", params: {emailNotification, mobileNotification, desktopNotification}});
        dispatch({type: "CHANGE", name: "submittingRequest", value: "IN_PROGRESS" });
        state.request.submit().finally(() => {
            dispatch({type: "CHANGE", name: "submittingRequest", value: "DONE" });
        })
        dispatch({type: "CHANGE", name: "activeStep", value: state.steps[currentStepIndex+1] });

    }
    const back = () => {
        if (currentStepIndex <= 0)
            return;
        dispatch({type: "CHANGE", name: "activeStep", value: state.steps[currentStepIndex - 1] });
    }
    return (
        <>
            <div className={styles.keywords}>
                <div className={communStyles.alertBloc}>
                    <AlertiIcons name={"email"} />
                    <h3>{t('email_notification')}</h3>
                    <div className={communStyles.notifications}>
                        {
                            consts.notifications.map((notif, index) => (
                                <Radio checked={emailNotification === notif}
                                       onchange={() => setEmailNotification(notif)}
                                       key={index}
                                       name={t(notif)} />
                            ))
                        }
                    </div>
                </div>
                <div className={communStyles.alertBloc}>
                    <AlertiIcons name={"mobile"} />
                    <h3>{t('mobile_notification')}</h3>
                    <div className={communStyles.notifications}>
                        {
                            consts.notifications.map((notif, index) => (
                                <Radio checked={mobileNotification === notif}
                                       onchange={() => setMobileNotification(notif)}
                                       key={index}
                                       name={t(notif)} />
                            ))
                        }
                    </div>
                </div>
                <div className={communStyles.alertBloc}>
                    <AlertiIcons name={"desktop"} />
                    <h3>{t('desktop_notification')}</h3>
                    <div className={communStyles.notifications}>
                        {
                            consts.notifications.map((notif, index) => (
                                <Radio checked={desktopNotification === notif}
                                       onchange={() => setDesktopNotification(notif)}
                                       key={index}
                                       name={t(notif)} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <SliderNavigation display={state.steps.length > 1}
                              isFirst={currentStepIndex === 0}
                              isLast={currentStepIndex === state.steps.length - 1}
                              next={validate}
                              prev={back} />
        </>
    );
}