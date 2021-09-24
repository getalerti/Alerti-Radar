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
    console.log(name, value);
    if (name === "alertType" && state.alertType === "keywords") {
        state.steps = [consts.monitor_types];
        state.steps[1] = consts.keywords_form;
        state.steps[2] = consts.alert_sources_form;
        state.steps[3] = consts.alert_notifications_form;
        state.steps[4] = consts.alert_success_form;
        state.validatedSteps.add(state.activeStep);
    }
    if (name === "alertType" && state.alertType === "social") {
        state.steps = [consts.monitor_types];
        state.steps[1] = consts.alert_social_admin_accounts_form;
        state.steps[2] = consts.alert_notifications_form;
    }
    if (name === "alertType" && state.alertType === "reviews") {
        state.steps = [consts.monitor_types];
        state.steps[1] = consts.alert_reviews_form;
        state.steps[2] = consts.alert_notifications_form;
    }
    console.log(state.steps)
    return state;
}

const createRequest = (state, params) => {
    state.request.update(params);
    return state;
}

const reducer = (state, {type, name, value, params}) => {
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