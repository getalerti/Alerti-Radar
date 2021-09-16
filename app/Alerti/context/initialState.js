import consts from "../helpers/consts";
import CreateRequest from "../service/CreateRequest";

const state = {
    alertType: "",
    monitorType: "",
    alertName: "",
    loading: false,
    success: false,
    steps: [consts.monitor_ypes],
    validatedSteps: new Set(),
    activeStep: consts.monitor_ypes,
    request: {...CreateRequest}
}
const initState = () => {
    return {...state};
}
const onChange = (state, name, value) => {
    if (name === "success") {
        state = {...initState()}
        state.success = true;
        return state;
    }
    state[name] = value;
    if (name === "monitorType" && state.alertType === "keywords") {
        state.steps[1] = consts.keywords_form;
        state.steps[2] = consts.alert_sources_form;
        state.steps[3] = consts.alert_notifications_form;
        state.validatedSteps.add(state.activeStep);
    }
    return state;
}

const createRequest = (state, params) => {
    state.request.update(params);
    return state;
}

const reducer = (state, {type, name, value, params}) => {
    console.log({state})
    switch (type) {
        case "CHANGE":
            return {
                ...onChange(state, name, value)
            };
        case "REQUEST":
            return {
                ...createRequest(state, params)
            };
        default:
            return state;
    }
};
export default {state, reducer};