const authorizationObject = {
    my_company:     ["keywords", "reviews", "social"],
    competitors:    ["keywords", "reviews"],
    me:             ["keywords", "social"],
    products:       ["keywords", "reviews", "social"],
    clients:        ["keywords", "social"],
    suppliers:      ["keywords"],
    industry:       ["keywords"],
    place:          ["keywords", "social"],
    event:          ["keywords", "social"],
    celebrity:      ["social"]
}
const getMonitorTypes = (alertType) => {
    const monitorTypes = Object.keys(authorizationObject);
    return monitorTypes.filter((monitorType) => {
        return authorizationObject[monitorType].indexOf(alertType) !== -1;
    });
}
export default getMonitorTypes;