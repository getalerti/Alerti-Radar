import useTranslation from "../../i18n";

const t = useTranslation();

function initFacebookSdk() {
    return new Promise(resolve => {
        window.FB.init({
            appId: process.env.FACEBOOK_APP_ID,
            cookie: true,
            xfbml: true,
            version: 'v8.0'
        });
        (function(d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');

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