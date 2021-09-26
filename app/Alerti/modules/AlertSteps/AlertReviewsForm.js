import styles from "./style.module.scss";
import communStyles from "./../../styles/commun.module.scss";
import AlertiIcons from "../../components/AlertiIcons";
import useTranslation from "../../../helpers/i18n";
import ListInput from "../../components/ListInput";
import consts from "../../helpers/consts";
import Checkbox from "../../components/Checkbox";
import RssFeedsInput from "../../components/RssFeedsInput";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../context";
import SliderNavigation from "../../components/SliderNavigation";
import StepsValidations from "../../validations/StepsValidations";
import FacbookAccount from "../../components/FacbookAccount";
import UrlListInput from "../../components/UrlListInput";
import SearchGooglePlaces from "../../components/SearchGooglePlaces";
import GoogleAccount from "../../components/GoogleAccount";
import {getFacebookFanPages, getGoogleLocations, getTwitterAccounts} from "../../service/API";
import Loader from "../../components/Loader";

export default () => {
    const t = useTranslation();
    const reviews = consts.alert_reviews_sources;

    const {state, dispatch} = useContext(Context);
    const currentStepIndex = state.steps.indexOf(state.activeStep);
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(null);
    const [alertReviews, setAlertReviews] = useState([]);

    const getName = (e) => {
        setName(e.target.value);
        setNameError(null);
    };
    const addOrRemoveReview = (review) => {
        const exist = alertReviews.some(_review => _review === review);
        if (exist) {
            setAlertReviews(alertReviews.filter(_review => _review !== review));
        } else {
            setAlertReviews([...alertReviews, review]);
        }
    }

    const [opinion_assurances_urls, setOpinion_assurances_urls] = useState([]);
    const [trip_advisor_urls, setTrip_advisor_urls] = useState([]);
    const [booking_urls, setBooking_urls] = useState([]);
    const [expedia_urls, setExpedia_urls] = useState([]);
    const [agoda_urls, setAgoda_urls] = useState([]);
    const [trustpilot_urls, setTrustpilot_urls] = useState([]);
    const [google_places, setGoogle_places] = useState([]);
    const [my_pages_indexes, setMy_pages_indexes] = useState([]);
    const [google_places_indexes, setGoogle_places_indexes] = useState([]);
    const [facebookAccounts, setFacebookAccounts] = useState([]);
    const [googleAccounts, setGoogleAccounts] = useState([]);
    const [loadFacebookFanPages, setLoadFacebookFanPages] = useState(false);
    const [loadGoogleAccounts, setLoadGoogleAccounts] = useState(false);

    const refreshFacebookFanPages = () => {
        setLoadFacebookFanPages(true);
        getFacebookFanPages()
            .then(fanPagesResponse => fanPagesResponse.json())
            .then(fanPagesData => {
                const { fan_pages } = fanPagesData;
                setFacebookAccounts(fan_pages.filter(item => item.instagram_business_account == null))
            })
            .catch(fanPagesError => { console.log({fanPagesError}) })
            .finally(() => { setLoadFacebookFanPages(false) })
    }
    const refreshGoogleAccounts = () => {
        setLoadGoogleAccounts(true);
        getGoogleLocations()
            .then(googleAccountsResponse => googleAccountsResponse.json())
            .then(googleAccountsData => {
                const { my_business_locations } = googleAccountsData;
                setGoogleAccounts(my_business_locations)
            })
            .catch(googleAccountsError => { console.log({googleAccountsError}) })
            .finally(() => { setLoadGoogleAccounts(false) })
    }
    useEffect(() => {
        refreshFacebookFanPages()
        refreshGoogleAccounts()
    }, [])
    const changeReviewURLs = (review, items) => {
        switch (review) {
            case "opinion_assurances_urls": setOpinion_assurances_urls(items); break;
            case "trip_advisor_urls":       setTrip_advisor_urls(items); break;
            case "booking_urls":            setBooking_urls(items); break;
            case "expedia_urls":            setExpedia_urls(items); break;
            case "agoda_urls":              setAgoda_urls(items); break;
            case "trustpilot_urls":         setTrustpilot_urls(items); break;
            case "google_places":           setGoogle_places(items); break;
        }
    }
    const getReviewURLs = (review) => {
        switch (review) {
            case "opinion_assurances_urls": return opinion_assurances_urls;
            case "trip_advisor_urls":       return trip_advisor_urls;
            case "booking_urls":            return booking_urls;
            case "expedia_urls":            return expedia_urls;
            case "agoda_urls":              return agoda_urls;
            case "trustpilot_urls":         return trustpilot_urls;
            case "google_places":           return google_places;
            default: return [];
        }
    }
    const updateMyPagesIndexes = (index) => {
        const exist = my_pages_indexes.some(_index => index === _index);
        if (!exist) setMy_pages_indexes([...my_pages_indexes, index]);
        else setMy_pages_indexes(my_pages_indexes.filter(_index => index !== _index));
    }
    const updateGoogleAccountsIndexes = (index) => {
        const exist = google_places_indexes.some(_index => index === _index);
        if (!exist) setGoogle_places_indexes([...google_places_indexes, index]);
        else setGoogle_places_indexes(google_places_indexes.filter(_index => index !== _index));
    }
    const validate = () => {
        const my_pages = {};
        my_pages_indexes.forEach((index) => {
            const { id, client_id } = facebookAccounts[index]
            if (!my_pages[client_id]) my_pages[client_id] = {};
            my_pages[client_id][id] = id;
        });
        const google_my_business_locations = {};
        google_places_indexes.forEach((index) => {
            const { name, google_plus_account_id } = googleAccounts[index]
            if (!google_my_business_locations[google_plus_account_id]) google_my_business_locations[google_plus_account_id] = [];
            google_my_business_locations[google_plus_account_id].push(name);
        });

        const requestParams = { name, opinion_assurances_urls,
            trip_advisor_urls, booking_urls, expedia_urls, agoda_urls,
            trustpilot_urls, google_places, google_my_business_locations, my_pages};

        const validation = StepsValidations(consts.alert_reviews_form, requestParams);
        if (validation !== true) {
            if (parent && parent.scroll) parent.scroll(0, 0);
            return;
        }

        if (state.steps && currentStepIndex >= state.steps.length - 1)
            return;

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
                    <div>
                        <AlertiIcons name={"reviews"} />
                        <h3>{t('reviews')}</h3>
                    </div>
                    <div>
                        {
                            reviews.map(review => (
                                <Checkbox key={review}
                                          icon={review}
                                          checked={alertReviews.some(_review => _review === review)}
                                          onchange={() => addOrRemoveReview(review)}
                                          name={t(review)} />
                                ))
                        }
                    </div>
                    {
                        reviews.map((review, index) => {
                            return review !== "myBusiness" && review !== "facebook" && alertReviews.some(_review => _review === review) ? (
                                    <UrlListInput key={index}
                                                  type={review}
                                                  values={getReviewURLs(review + "_urls")}
                                                  onchange={(items) => { changeReviewURLs(review + "_urls", items) }}
                                                  iconName={review}
                                                  title={t(review + "_urls")}
                                                  placeholder={t(review)} />
                                )
                                : <></>;
                        })
                    }
                </div>
                {
                    alertReviews.some(review => review === 'myBusiness') && (
                        <div className={communStyles.alertBloc}>
                            <AlertiIcons name={"myBusiness"} />
                            <h3>{t('google_mybusiness')} <GoogleAccount title={t('add_google_account')} /></h3>
                            {
                                loadGoogleAccounts ? <Loader /> :
                                    googleAccounts.map((item, index) => {
                                        return (
                                            <div key={index} className={communStyles.item_img}>
                                                <input
                                                    type={"checkbox"}
                                                    onClick={() => { updateGoogleAccountsIndexes(index) }}
                                                    checked={google_places_indexes.some(_index => index === _index)}/>
                                                <AlertiIcons name={"myBusiness"} />
                                                <span>{item.location_name}</span>
                                            </div>
                                        )
                                    })
                            }
                            <SearchGooglePlaces iconName={"myBusiness"} onchange={setGoogle_places} placeholder={t('search_google_places_description')} />
                        </div>
                    )
                }
                {
                    alertReviews.some(review => review === 'facebook') && (
                        <div className={communStyles.alertBloc}>
                            <AlertiIcons name={"facebook"} />
                            <h3>{t('facebook_pages')}<FacbookAccount handleSuccess={setFacebookAccounts} /></h3>
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
                    )
                }
            </div>
            <SliderNavigation display={state.steps.length > 1}
                              isFirst={currentStepIndex === 0}
                              isLast={currentStepIndex === state.steps.length - 1}
                              next={validate}
                              prev={back} />
        </>
    );
}