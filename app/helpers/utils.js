import consts from "./consts";

const fetchAPI = async (url, method, data, isProtected = false, isAlerti = false) => {
    if(typeof window === "undefined")
        return ;
    const headers = {
        'Content-Type': 'application/json'
    };
    if (isAlerti) {
        headers["x-auth-token"] = process.env.ALERTI_API_TOKEN;
    }
    if (!isAlerti && isProtected) {
        let authenticatedUser = window.localStorage.getItem(consts.isAuthenticatedUser);
        authenticatedUser = JSON.parse(authenticatedUser);
        const jwt = authenticatedUser.jwt;
        headers["Authorization"] = `Barear ${jwt}`;
    }
    let fetchMethod = {
        method: method,
        mode: 'cors',
        cache: 'no-cache',
        headers,
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    }
    if (method === "POST" || method === "PUT") {
        fetchMethod = {...fetchMethod, "body": JSON.stringify(data)}
    }
    const response = await fetch(`${!isAlerti ? process.env.API_URL : ""}${url}`, fetchMethod);
    return response.json();
}
const formatDate = (date) => {
    const _date = new Date(date);
    return (_date.getMonth() + 1) +
        "/" +  _date.getDate() +
        "/" +  _date.getFullYear();
}
const isEmail = (email) => /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
const isURL = (url) => {
    var res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null);
};
const isPassword = (password) => password && password.length >= 5;
const isNotEmpty = (value) => value && value.length > 0 ? true : false;
const getSMShareUrl = (social, text) => {
    switch (social) {
        case "facebook":
            return `https://www.facebook.com/sharer/sharer.php?u=${text}`;
        case "twitter":
            return `https://twitter.com/share?url=${text}`;
        case "linkedin":
            return `http://www.linkedin.com/shareArticle?&url=${text}`;
        default:
            return "";
    }
}
const validateNewSourceForm = (type, data) => {
    if (type === 'podcast' || type === 'rss' || type === 'website' ) {
        return isURL(data)
    }
    return isNotEmpty(data);
}
const sanitizeUrl = (url) => {
    return `${url.slice(0, 4) !== "http" ? "https://" : ""}${url}`;
}
export {
    fetchAPI,
    isEmail,
    isPassword,
    isNotEmpty,
    formatDate,
    getSMShareUrl,
    isURL,
    validateNewSourceForm,
    sanitizeUrl
}