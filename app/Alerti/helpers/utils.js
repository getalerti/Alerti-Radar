import useTranslation from "../../helpers/i18n";

const t = useTranslation();

function initFacebookSdk() {
    return new Promise(resolve => {
        window.FB.init({
            appId: process.env.FACEBOOK_APP_ID,
            cookie: true,
            xfbml: true,
            version: 'v8.0'
        });
        resolve();
    });
}
const msg = (name, param = "") => {
    if (param !== "")
        return t(name).replace("###", param);
    return t(name);
}
export {
    msg,
    initFacebookSdk
}