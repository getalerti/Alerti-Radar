import styles from "./style.module.scss";
import communStyles from "./../../styles/commun.module.scss";
import AlertiIcons from "../../components/AlertiIcons";
import useTranslation from "../../../helpers/i18n";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../context";
import SliderNavigation from "../../components/SliderNavigation";
import FacbookAccount from "../../components/FacbookAccount";
import TwitterAccount from "../../components/TwitterAccount";
import StepsValidations from "../../validations/StepsValidations";
import consts from "../../helpers/consts";
import {getFacebookFanPages, getTwitterAccounts} from "../../service/API";
import Loader from "../../components/Loader";

export default () => {
    const t = useTranslation();
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(null);
    const [accountsError, setAccountsError] = useState(null);
    const {state, dispatch} = useContext(Context);
    const currentStepIndex = state.steps.indexOf(state.activeStep);


    const [my_pages_indexes, setMy_pages_indexes] = useState([]);
    const [facebookAccounts, setFacebookAccounts] = useState([]);

    const [instagram_indexes, setInstagram_indexes] = useState([]);
    const [instagramAccounts, setInstagramAccounts] = useState([]);

    const [twitter_indexes, setTwitter_indexes] = useState([]);
    const [twitterAccounts, setTwitterAccounts] = useState([]);

    const [loadFacebookFanPages, setLoadFacebookFanPages] = useState(false);
    const [loadTwitterAccounts, setLoadTwitterAccounts] = useState(false);

    const refreshFacebookFanPages = () => {
        setLoadFacebookFanPages(true);
        getFacebookFanPages()
            .then(fanPagesResponse => fanPagesResponse.json())
            .then(fanPagesData => {
                const { fan_pages } = fanPagesData;
                setFacebookAccounts(fan_pages.filter(item => item.instagram_business_account == null))
                setInstagramAccounts(fan_pages.filter(item => item.instagram_business_account != null))
            })
            .catch(fanPagesError => { console.log({fanPagesError}) })
            .finally(() => { setLoadFacebookFanPages(false) })
    }
    const refreshTwitterAccounts = () => {
        setLoadTwitterAccounts(true);
        getTwitterAccounts()
            .then(twitterAccountsResponse => twitterAccountsResponse.json())
            .then(twitterAccountsData => {
                const { twitter_accounts } = twitterAccountsData;
                setTwitterAccounts(twitter_accounts)
            })
            .catch(twitterAccountsError => { console.log({twitterAccountsError}) })
            .finally(() => { setLoadTwitterAccounts(false) })
    }
    useEffect(() => {
        refreshFacebookFanPages()
        refreshTwitterAccounts()
    }, [])

    const getName = (e) => {
        setName(e.target.value);
        setNameError(null);
    };
    const updateMyPagesIndexes = (index) => {
        setAccountsError(null);
        const exist = my_pages_indexes.some(_index => index === _index);
        if (!exist) setMy_pages_indexes([...my_pages_indexes, index]);
        else setMy_pages_indexes(my_pages_indexes.filter(_index => index !== _index));
    }
    const updateInstagramIndexes = (index) => {
        setAccountsError(null);
        const exist = instagram_indexes.some(_index => index === _index);
        if (!exist) setInstagram_indexes([...my_pages_indexes, index]);
        else setInstagram_indexes(my_pages_indexes.filter(_index => index !== _index));
    }
    const updateTwitterIndexes = (index) => {
        setAccountsError(null);
        const exist = twitter_indexes.some(_index => index === _index);
        if (!exist) setTwitter_indexes([...my_pages_indexes, index]);
        else setTwitter_indexes(my_pages_indexes.filter(_index => index !== _index));
    }
    const validate = () => {
        const validation = StepsValidations(consts.alert_social_admin_accounts_form, {name, instagram_indexes, my_pages_indexes, twitter_indexes});
        if (validation !== true) {
            setNameError(validation.fieldByField('name'));
            setAccountsError(validation.fieldByField('accounts'));
            return;
        }
        if (state.steps && currentStepIndex >= state.steps.length - 1)
            return;

        const my_pages = {};
        my_pages_indexes.forEach((index) => {
            const { account_id, page_id } = facebookAccounts[index]
            if (!my_pages[account_id]) my_pages[account_id] = {};
            my_pages[account_id][page_id] = page_id;
        });

        const instagram_business_accounts = {};
        instagram_indexes.forEach((index) => {
            const { instagram_business_account, account_id } = instagramAccounts[index]
            if (!instagram_business_accounts[account_id]) instagram_business_accounts[account_id] = [];
            instagram_business_accounts[account_id].push(instagram_business_account.instagram_id);
        });
        const requestParams = { name, my_pages, instagram_business_accounts, twitterAccounts};
        dispatch({type: "REQUEST", params: requestParams});
        dispatch({type: "CHANGE", name: "activeStep", value: state.steps[currentStepIndex+1] });
    }
    const back = () => {
        if (currentStepIndex <= 0)
            return;
        dispatch({type: "CHANGE", name: "activeStep", value: state.steps[currentStepIndex - 1] });
    }
    return (
        <>
            <div className={styles.sources}>
                <div className={communStyles.alertBloc}>
                    <AlertiIcons name={"name"} />
                    <input type={"text"}
                           value={name}
                           placeholder={t('alert_name') + " *"}
                           onChange={getName}
                           data-valid={nameError === null} />
                    { nameError && <div className={communStyles.fieldError}>{nameError}</div> }
                </div>

                <div className={communStyles.alertBloc}>
                    <AlertiIcons name={"facebook"} />
                    <h3>{t('facebook_pages')}<FacbookAccount handleSuccess={refreshFacebookFanPages} /></h3>
                    {
                        loadFacebookFanPages ? <Loader /> :
                        facebookAccounts.map((item, index) => {
                            return (
                                <div key={index} className={communStyles.item_img}>
                                    <input
                                        type={"checkbox"}
                                        onClick={() => { updateMyPagesIndexes(index) }}
                                        checked={my_pages_indexes.some(_index => index === _index)}/>
                                    <img src={item.picture} />
                                    <span>{item.name}</span>
                                </div>
                            )
                        })
                    }
                </div>

                <div className={communStyles.alertBloc}>
                    <AlertiIcons name={"instagram"} />
                    <h3>{t('instagram_pages')}<FacbookAccount dataType={"instagram"}  handleSuccess={refreshFacebookFanPages}  /></h3>
                    {
                        loadFacebookFanPages ? <Loader /> :
                        instagramAccounts.map((item, index) => {
                            return (
                                <div key={index} className={communStyles.item_img}>
                                    <input
                                        type={"checkbox"}
                                        onClick={() => { updateInstagramIndexes(index) }}
                                        checked={instagram_indexes.some(_index => index === _index)}/>
                                    <img src={item.picture} />
                                    <span>{item.instagram_business_account.name} <br /> {item.instagram_business_account.username}</span>
                                </div>
                            )
                        })
                    }
                </div>

                <div className={communStyles.alertBloc}>
                    <AlertiIcons name={"twitter"} />
                    <h3>{t('twitter_accounts')}<TwitterAccount handleSuccess={refreshTwitterAccounts} /></h3>
                    {
                        loadTwitterAccounts ? <Loader /> :
                        twitterAccounts.map((item, index) => {
                            return (
                                <div key={index} className={communStyles.item_img}>
                                    <input
                                        type={"checkbox"}
                                        onClick={() => { updateTwitterIndexes(index) }}
                                        checked={twitter_indexes.some(_index => index === _index)}/>
                                    <img src={item.avatar_url} />
                                    <span>{item.twitter_id}</span>
                                </div>
                            )
                        })
                    }
                </div>

                { accountsError && <div className={communStyles.fieldError}>{accountsError}</div> }
            </div>
            <SliderNavigation display={state.steps.length > 1}
                              isFirst={currentStepIndex === 0}
                              isLast={currentStepIndex === state.steps.length - 1}
                              next={validate}
                              prev={back} />
        </>
    );
}