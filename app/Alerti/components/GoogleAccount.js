import React from 'react';
import useTranslation from "../../i18n";
import styles from "./../styles/commun.module.scss"
import GoogleLogin from "react-google-login";
import GMB from "google_my_business";

export default ({ title }) => {

    const responseGoogle = (response) => {
        const token = response.accessToken;
        GMB.options({version: process.env.GOOGLE_MYBUSINESSAPI_VERSION});
        GMB.setAccessToken(token);
        GMB.api('accounts', 'get', {}, function (res) {
            if(!res || res.error) {
                console.log(!res ? 'error occurred' : res.error);
                return;
            }
            console.log({res});
        });
        console.log({response});
    }
    return <GoogleLogin
        clientId={process.env.GOOGLE_CLIENT_ID}
        buttonText={title}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        accessType={"offline"}
        responseType={"code permission id_token"}
        scope={"openid profile email https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/business.manage"}
    />
}