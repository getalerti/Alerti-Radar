import consts from "../helpers/consts";

const state = {
    alertType: "",
    monitorType: "",
    alertName: "",
    steps: [consts.monitorTypes],
    validatedSteps: new Set(),
    activeStep: consts.monitorTypes
}

const onChange = (state, name, value) => {
    state[name] = value;
    if (name === "monitorType" && state.alertType === "keywords") {
        state.steps[1] = consts.reviews_form;
        state.steps[2] = consts.alert_sources_form;
        state.steps[3] = consts.alert_notifications_form;
        state.validatedSteps.add(state.activeStep);
        // state.activeStep = consts.reviews_form;
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