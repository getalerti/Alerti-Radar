import consts from "../helpers/consts";

const state = {
    alertType: "",
    monitorType: "",
    alertName: "",
    steps: [consts.monitor_ypes],
    validatedSteps: new Set(),
    activeStep: consts.monitor_ypes
}

const onChange = (state, name, value) => {
    state[name] = value;
    if (name === "monitorType" && state.alertType === "keywords") {
        state.steps[1] = consts.keywords_form;
        state.steps[2] = consts.alert_sources_form;
        state.steps[3] = consts.alert_notifications_form;
        state.validatedSteps.add(state.activeStep);
    }
    return state;
}
const reducer = (state, {type, name, value}) => {
    switch (type) {
        case "CHANGE":
            return {
                ...onChange(state, name, value)
            };
        default:
            return state;
    }
};
export default {state, reducer};