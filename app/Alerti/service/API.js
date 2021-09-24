const url = process.env.ALERTI_API_URL;
const auth_token = process.env.ALERTI_API_TOKEN;

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("X-Auth-Token", auth_token);

const requestOptions = {
    headers: myHeaders,
    redirect: 'follow'
};
const objectToQueryParams = (obj) => {
    const keys = Object.keys(obj);
    let query = "";
    keys.forEach((key, index) => {
        query += `${index > 0 ? '&' : ''}${key}=${obj[key]}`;
    });
    return query;
}
const create = (body) => {
    requestOptions.method = "POST";
    requestOptions.body = JSON.stringify(body);
    return fetch(`${url}/alerts`, requestOptions);
}
const list = (params) => {
    requestOptions.method = "GET";
    delete requestOptions.body;
    const query = objectToQueryParams(params);
    console.log({query})
    return fetch(`${url}/alerts${query}`, requestOptions);
}
const find = (id) => {
    requestOptions.method = "GET";
    delete requestOptions.body;
    return fetch(`${url}/alerts/${id}`, requestOptions);
}
const update = (id, body) => {
    requestOptions.method = "PUT";
    requestOptions.body = JSON.stringify(body);
    return fetch(`${url}/alerts/${id}`, requestOptions);
}
const remove = (id) => {
    requestOptions.method = "DELETE";
    delete requestOptions.body;
    return fetch(`${url}/alerts/${id}`, requestOptions);
}
const addOrUpdateFacebookAccount = ({access_token, account_id}) => {
    const formdata = new FormData();
    formdata.append("access_token", access_token);
    formdata.append("app_key", process.env.FACEBOOK_APP_SECRET);
    formdata.append("account_id", account_id);
    requestOptions.method = "POST";
    requestOptions.body = formdata;
    return fetch(`${url}/facebook/accounts/sdk_callback`, requestOptions);
}
const getFacebookFanPages = (include_instagram_business_accounts= true, load_from_facebook= true) => {
    requestOptions.method = "GET";
    delete requestOptions.body;
    const queryParams = objectToQueryParams({include_instagram_business_accounts, load_from_facebook})
    return fetch(`${url}/facebook/fan_pages?${queryParams}`, requestOptions);
}
const getTwitterAccounts = () => {
    requestOptions.method = "GET";
    delete requestOptions.body;
    return fetch(`${url}/twitter/accounts`, requestOptions);
}
const addTwitterAccount = (params) => {
    requestOptions.method = "POST";
    requestOptions.body = JSON.stringify(params);
    return fetch(`${url}/facebook/accounts`, requestOptions);
}
export {
    create,
    find,
    update,
    remove,
    list,
    addOrUpdateFacebookAccount,
    getFacebookFanPages,
    getTwitterAccounts,
    addTwitterAccount
}