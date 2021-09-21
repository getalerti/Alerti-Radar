import React, { useState, useEffect } from 'react';
import { FacebookProvider, LoginButton } from 'react-facebook';
import useTranslation from "../../helpers/i18n";
import AlertiIcons from "./AlertiIcons";
import styles from "./../styles/commun.module.scss"
import {initFacebookSdk} from "../helpers/utils";
import Loader from "./Loader";

export default ({ handleSuccess = () => {} }) => {
    const t = useTranslation();
    const [ready, isReady] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        initFacebookSdk().then(res => {
            isReady(true);
        });
    }, []);
    const handleResponse = data => {
        if (data && data.tokenDetail) {
            const client_id = data.tokenDetail.userID;
            setError(null);
            try {
                FB.api(
                    '/me',
                    'GET',
                    {
                        fields: 'accounts{picture{url},name,id}',
                        access_token: data.tokenDetail.accessToken,
                    },
                    async function (response) {
                        if (response.accounts) {
                            const sanitizedData = [];
                            const accounts = response.accounts;
                            const items = accounts.data;
                            items.forEach(({ id, name, picture }) => {
                                sanitizedData.push({
                                    id,
                                    client_id,
                                    name,
                                    picture: picture.data.url,
                                });
                            });
                            let next = accounts.paging.next;
                            while (next != null) {
                                let result = await fetch(next);
                                result = await result.json();
                                const items = result.data;
                                items.forEach(({ id, name, picture }) => {
                                    sanitizedData.push({
                                        id,
                                        client_id,
                                        name,
                                        picture: picture.data.url,
                                    });
                                });
                                next = result.paging.next;
                            }
                            handleSuccess(sanitizedData);
                        }
                    }
                );
            } catch (e) {
                handleError(e)
            }
        }
    };

    const handleError = error => {
        console.log({error_facebook_connection: error})
        setError("error_facebook_connection")
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
