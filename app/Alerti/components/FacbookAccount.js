import React, { useState, useEffect } from 'react';
import { FacebookProvider, LoginButton } from 'react-facebook';
import useTranslation from "../../i18n";
import AlertiIcons from "./AlertiIcons";
import styles from "./../styles/commun.module.scss"
import {initFacebookSdk} from "../helpers/utils";
import Loader from "./Loader";

export default ({ handleSuccess = () => {} }) => {
    const t = useTranslation();
    const [ready, isReady] = useState(false);
    useEffect(() => {
        initFacebookSdk().then(res => {
            isReady(true);
        });
    }, []);
    const handleResponse = data => {
        if (data && data.tokenDetail) {
            FB.api('/me/accounts', 'GET', {}, function(response) {
                if (response && response.data) {
                    const resultArray = {
                        pages: [],
                        userInfo: {
                            name: data.profile.name,
                            id: data.profile.id,
                            picture: data.profile.picture.data.url,
                            accessToken: data.tokenDetail.accessToken
                        }
                    };
                    response.data.forEach(page => {
                        const pageObject = {
                            id: page.id,
                            name: page.name,
                            picture: ""
                        }
                        FB.api('/'+page.id+'/picture', 'GET', {}, function(response) {
                            if (response.data)
                                pageObject.picture = response.data.url;
                            resultArray.pages.push({...pageObject});
                            if (handleSuccess())
                                handleSuccess(resultArray)
                        });
                    })
                }
                if (response && response.error) {
                    const handleError = error => {
                        console.log({ FacebookAccountResponseError: error });
                    };
                }
            });
        }
    };

    const handleError = error => {
        console.log({ FacebookAccountError: error });
    };
    if (!ready) return <Loader />;
    return (
        <FacebookProvider appId={process.env.FACEBOOK_APP_ID}>
            <LoginButton
                scope="pages_show_list"
                onCompleted={handleResponse}
                onError={handleError}
                className={styles.facebook_connect_btn}
            >
                <span><AlertiIcons name={"facebook"} /> {t('connect_facebook_account')}</span>
            </LoginButton>
        </FacebookProvider>
    );
};
