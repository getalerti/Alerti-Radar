import styles from "./style.module.scss";
import consts from "./../../helpers/consts";
import KeywordsForm from "./KeywordsForm";
import MonitorTypes from "./MonitorTypes";
import {useContext, useEffect, useRef, useState} from "react";
import {Context} from "../../context";
import AlertSourcesForm from "./AlertSourcesForm";
import AlertNotifications from "./AlertNotifications";
import Loader from "../../components/Loader";
import AlertSuccess from "./AlertSuccess";

export default ({details}) => {
    const {state, dispatch} = useContext(Context);
    const [slideIndex, setSlideIndex] = useState(0);
    const sliderDiv = useRef(null);
    const getStepComponent = (step) => {
        if (step === consts.monitor_ypes) return <MonitorTypes details={details} />;
        if (step === consts.keywords_form) return <KeywordsForm />;
        if (step === consts.alert_sources_form) return <AlertSourcesForm />;
        if (step === consts.alert_notifications_form) return <AlertNotifications />;
        return <div>NOTHING</div>
    }
    const next = () => {
        if (state.steps && slideIndex >= state.steps.length - 1)
            return;
        setSlideIndex(slideIndex + 1);
    }
    const prev = () => {
        if (slideIndex <= 0)
            return;
        setSlideIndex(slideIndex - 1);
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
                state.loading && <Loader />
            }
            <div className={styles.alertStepsSlider} id={"alertStepsSlider"} ref={sliderDiv}>
                { state.success && <AlertSuccess /> }
                { !state.success && state.steps.map(step => (
                    <div key={step} data-active-step={step === state.activeStep}>
                        {getStepComponent(step)}
                    </div>
                )) }
            </div>
        </div>
    )
}