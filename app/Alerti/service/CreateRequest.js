import {createAlert} from "../helpers/requestsBody";

export default class CreateRequest {
    constructor() {
        this.requestBody = createAlert;
    }
    setType(type) {
        this.requestBody.alert.alert_type = type;
        return this;
    }
    setMonitorType(type) {
        this.requestBody.alert.monitor_type = type;
        return this;
    }
    setKeywordStep(data) {
        const { title, excluded_keywords, included_keywords } = data;
        this.requestBody.alert.name = title;
        this.requestBody.alert.alert_query_settings = title;
        return this;
    }
}