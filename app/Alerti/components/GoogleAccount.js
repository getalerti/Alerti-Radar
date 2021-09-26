import React from 'react';
import GoogleLogin from "react-google-login";
import {addGoogleAccount} from "../service/API";

export default ({ title, handleSuccess = () => {}  }) => {
    const responseGoogle = (response) => {
        const token = response.code;
        const params = {
            auth_code: token,
            redirect_uri: location.origin
        }
        addGoogleAccount(params).then(addGoogleAccountResponse => {
            return addGoogleAccountResponse.json()
        }).then(addGoogleAccountResponse => {
            console.log({addGoogleAccountResponse})
        }).catch(addGoogleAccountError => {
            console.log({addGoogleAccountError})
        }).finally(() => { handleSuccess() })
    }
    return <GoogleLogin
        clientId={process.env.GOOGLE_CLIENT_ID}
        buttonText={title}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        accessType={"online"}
        responseType={"code"}
        redirectUri={location.origin}
        scope={"openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/business.manage]"}
    />
}