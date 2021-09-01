export default class FieldError {
    constructor(fieldName, errorMessage) {
        this.fieldName = fieldName;
        this.errorMessage = errorMessage;
    }
    fieldByField(name) {
        return this.fieldName === name ? this.errorMessage : null;
    }
}