import React, { useState, useEffect } from 'react';
import { FacebookProvider, LoginButton } from 'react-facebook';
import useTranslation from "../../helpers/i18n";
import AlertiIcons from "./AlertiIcons";
import styles from "./../styles/commun.module.scss"
import {initFacebookSdk} from "../helpers/utils";
import Loader from "./Loader";
import {addOrUpdateFacebookAccount} from "../service/API";

export default ({ dataType = "", handleSuccess = () => {} }) => {
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
            const access_token = data.tokenDetail.accessToken;
            setError(null);
            const fields = dataType === "instagram" ? "accounts{instagram_business_account,name,id,picture{url}}" : "accounts{picture{url},name,id}";
            try {
                FB.api(
                    '/me',
                    'GET',
                    {
                        fields: fields,
                        access_token: data.tokenDetail.accessToken,
                    },
                    async function (response) {
                        /*
                        if (response.accounts) {
                            const sanitizedData = [];
                            const accounts = response.accounts;
                            const items = accounts.data;
                            items.forEach(({ id, instagram_business_account, name, picture }) => {
                                sanitizedData.push({
                                    id,
                                    client_id,
                                    instagram_business_account,
                                    name,
                                    picture: picture.data.url,
                                });
                            });
                            let next = accounts.paging.next;
                            while (next != null) {
                                let result = await fetch(next);
                                result = await result.json();
                                const items = result.data;
                                items.forEach(({ id, name,instagram_business_account, picture }) => {
                                    sanitizedData.push({
                                        id,
                                        client_id,
                                        instagram_business_account,
                                        name,
                                        picture: picture.data.url,
                                    });
                                });
                                next = result.paging.next;
                            }
                            handleSuccess(sanitizedData);
                        }

                         */
                    }
                );
            } catch (e) {
                handleError(e)
            }
            addOrUpdateFacebookAccount({
                access_token,
                account_id: client_id
            }).then(addOrUpdateFacebookAccountResponse => {
                return addOrUpdateFacebookAccountResponse.json()
            }).then(addOrUpdateFacebookAccountResponse => {
                console.log({addOrUpdateFacebookAccountResponse})
            }).catch(addOrUpdateFacebookAccountError => {
                console.log({addOrUpdateFacebookAccountError})
            }).finally(() => { handleSuccess() })
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
