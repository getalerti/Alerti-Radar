import styles from "./style.module.scss";
import consts from "./../../helpers/consts";
import MonitorTypes from "./MonitorTypes";
import {useContext, useEffect, useRef, useState} from "react";
import {Context} from "../../context";
import AlertSourcesForm from "./AlertSourcesForm";
import AlertNotifications from "./AlertNotifications";
import Loader from "../../components/Loader";
import AlertSuccess from "./AlertSuccess";
import AlertKeywordsForm from "./AlertKeywordsForm";

export default ({details}) => {
    const {state, dispatch} = useContext(Context);
    const [slideIndex, _] = useState(0);
    const sliderDiv = useRef(null);
    const getStepComponent = (step) => {
        if (step === consts.monitor_types) return <MonitorTypes details={details} />;
        if (step === consts.keywords_form) return <AlertKeywordsForm />;
        if (step === consts.alert_sources_form) return <AlertSourcesForm />;
        if (step === consts.alert_notifications_form) return <AlertNotifications />;
        if (step === consts.alert_success_form) return <AlertSuccess />;
        return <div></div>
    }
    useEffect(() => {
        dispatch({type: "CHANGE", name: "activeStep", value: state.steps[slideIndex] });
    }, [slideIndex])
    useEffect(() => {
        dispatch({type: "CHANGE", name: "alertType", value: details.alertType });
    }, [])
    return (
        <div className={styles.alertStepsContainer} data-loading={state.loading}>
            {
                state.loading && <Loader position={"absolute"} />
            }
            <div className={styles.alertStepsSlider} id={"alertStepsSlider"} ref={sliderDiv}>
                { state.steps && state.steps.map(step => (
                    <div key={step} data-active-step={step === state.activeStep}>
                        {getStepComponent(step)}
                    </div>
                )) }
            </div>
        </div>
    )
}