import getMonitorTypes from "../../parameters/MonitorTypeAuthorization";
import styles from "./style.module.scss";
import MonitorType from "../../components/MonitorType";
import {useContext, useState} from "react";
import {Context} from "../../context";
import SliderNavigation from "../../components/SliderNavigation";

export default ({details}) => {
    const [selectedType, setSelectedType] = useState(null);
    const monitorTypes = getMonitorTypes(details.alertType);
    const {state, dispatch} = useContext(Context);
    const currentStepIndex = state.steps.indexOf(state.activeStep);
    const validate = () => {
        //TODO: Validation
        if (state.steps && currentStepIndex >= state.steps.length - 1)
            return;
        dispatch({type: "CHANGE", name: "activeStep", value: state.steps[currentStepIndex+1] });
    }
    const back = () => {
        if (currentStepIndex <= 0)
            return;
        dispatch({type: "CHANGE", name: "activeStep", value: state.steps[currentStepIndex - 1] });
    }
    const onChangeType = (newType) => {
        setSelectedType(newType);
        dispatch({type: "CHANGE", name: "monitorType", value: newType });
        dispatch({type: "CHANGE", name: "alertType", value: details.alertType });
        dispatch({type: "REQUEST", params: {monitorType: newType, alertType: details.alertType}});
    }
    return (
        <>
            <div className={styles.monitorTypes}>
                {
                    monitorTypes.map(mType => {
                        return (
                            <MonitorType
                                key={mType}
                                active={selectedType === mType}
                                name={mType}
                                onClick={() => { onChangeType(mType) }}
                            />
                        )
                    })
                }

                <MonitorType
                    active={selectedType === "other"}
                    name={"other"}
                    onClick={() => { onChangeType("other") }}
                />
            </div>
            <SliderNavigation display={state.steps.length > 1}
                              isFirst={currentStepIndex === 0}
                              isLast={currentStepIndex === state.steps.length - 1}
                              next={validate}
                              prev={back} />
        </>
    )
}