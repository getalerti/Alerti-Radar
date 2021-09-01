import styles from "./style.module.scss";
import consts from "./../../helpers/consts";
import KeywordsForm from "./KeywordsForm";
import MonitorTypes from "./MonitorTypes";
import {useContext, useEffect, useRef, useState} from "react";
import {Context} from "../../context";
import SliderNavigation from "../../components/SliderNavigation";
import AlertSourcesForm from "./AlertSourcesForm";
import AlertNotifications from "./AlertNotifications";

export default ({details}) => {
    const {state, dispatch} = useContext(Context);
    const [slideIndex, setSlideIndex] = useState(0);
    const sliderDiv = useRef(null);
    let scroll = 0;
    const getStepComponent = (step) => {
        return <AlertSourcesForm />;
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
        <div className={styles.alertStepsContainer}>
            <div className={styles.alertStepsSlider} ref={sliderDiv}>
                { state.steps.map(step => (
                    <div key={step} data-active-step={step === state.activeStep}>
                        {getStepComponent(step)}
                    </div>
                )) }
            </div>
        </div>
    )
}