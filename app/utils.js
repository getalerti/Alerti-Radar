const fetchAPI = async (url, method, data, isProtected = false) => {
    if(typeof window === "undefined")
        return ;
    const headers = {
        'Content-Type': 'application/json'
    };
    if (isProtected) {
        const jwt = window.localStorage.getItem("jwt");
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
    if (method === "POST") {
        fetchMethod = {...fetchMethod, "body": JSON.stringify(data)}
    }
    const response = await fetch(`${process.env.RESTURL_SPEAKERS}${url}`, fetchMethod);
    return response.json();
}
const formatDate = (date) => {
    const _date = new Date(date);
    return (_date.getMonth() + 1) +
        "/" +  _date.getDate() +
        "/" +  _date.getFullYear();
}
const isEmail = (email) => /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
const isPassword = (password) => password && password.length >= 5;
const isNotEmpty = (value) => value && value.length > 0;
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
export {
    fetchAPI,
    isEmail,
    isPassword,
    isNotEmpty,
    formatDate,
    getSMShareUrl
}