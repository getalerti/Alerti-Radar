import consts from "../helpers/consts";
import CreateRequest from "../service/CreateRequest";

const state = {
    alertType: "",
    monitorType: "",
    alertName: "",
    loading: false,
    submittingRequest: "NONE",
    steps: [consts.monitor_types],
    validatedSteps: new Set(),
    activeStep: consts.monitor_types,
    request: {...CreateRequest}
}
const onChange = (state, name, value) => {
    state[name] = value;
    if (name === "monitorType" && state.alertType === "keywords") {
        state.steps[1] = consts.keywords_form;
        state.steps[2] = consts.alert_sources_form;
        state.steps[3] = consts.alert_notifications_form;
        state.steps[4] = consts.alert_success_form;
        state.validatedSteps.add(state.activeStep);
        console.log({ steps: state.steps })
    }
    return state;
}

const createRequest = (state, params) => {
    state.request.update(params);
    return state;
}

const submitRequest = async (state) => {
    await state.request.submit();
    state.submittingRequest = "DONE";
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
        case "SUBMIT":
            return {
                ...submitRequest(state, params)
            };
        default:
            return state;
    }
};
export default {state, reducer};