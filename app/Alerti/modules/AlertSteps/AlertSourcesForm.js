import styles from "./style.module.scss";
import communStyles from "./../../styles/commun.module.scss";
import AlertiIcons from "../../components/AlertiIcons";
import useTranslation from "./../../../i18n";
import ListInput from "../../components/ListInput";
import consts from "../../helpers/consts";
import Checkbox from "../../components/Checkbox";
import RssFeedsInput from "../../components/RssFeedsInput";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../context";
import SliderNavigation from "../../components/SliderNavigation";
import StepsValidations from "../../validations/StepsValidations";
import FacbookAccount from "../../components/FacbookAccount";
import UrlListInput from "../../components/UrlListInput";
import SearchGooglePlaces from "../../components/SearchGooglePlaces";
import GoogleLogin from 'react-google-login';
import GMB from 'google_my_business';
import GoogleAccount from "../../components/GoogleAccount";

export default ({ onChangeHandler }) => {
    const t = useTranslation();
    const languages = consts.languages;
    const sources = consts.alert_sources;
    const reviews = consts.alert_reviews_sources;

    const {state, dispatch} = useContext(Context);
    const currentStepIndex = state.steps.indexOf(state.activeStep);

    const [lang, setLang] = useState(consts.defaultLang);
    const [langError, setLangError] = useState(null);

    const [alertSources, setAlertSources] = useState([]);
    const [checkAllSources, setCheckAllSources] = useState(false);
    const [sourcesError, setSourcesError] = useState(null);
    const addOrRemoveSource = (source) => {
        setSourcesError(null);
        const exist = alertSources.some(src => src === source);
        if (exist) {
            setAlertSources(alertSources.filter(src => src !== source));
        } else {
            setAlertSources([...alertSources, source]);
        }
    }
    const checkOrUncheckAllSources = () => {
        setAlertSources(!checkAllSources ? sources : []);
        setCheckAllSources(!checkAllSources);
    }

    const [alertReviews, setAlertReviews] = useState([]);
    const addOrRemoveReview = (review) => {
        const exist = alertReviews.some(_review => _review === review);
        if (exist) {
            setAlertReviews(alertReviews.filter(_review => _review !== review));
        } else {
            setAlertReviews([...alertReviews, review]);
        }
    }

    const [rssFeeds, setRssFeeds] = useState([]);

    const [excludeWebsites, setExcludeWebsites] = useState([]);

    const [excludeDomainNames, setExcludeDomainNames] = useState([]);

    const [excludeTweets, setExcludeTweets] = useState([]);

    const [opinion_assurances_urls, setOpinion_assurances_urls] = useState([]);
    const [trip_advisor_urls, setTrip_advisor_urls] = useState([]);
    const [booking_urls, setBooking_urls] = useState([]);
    const [expedia_urls, setExpedia_urls] = useState([]);
    const [agoda_urls, setAgoda_urls] = useState([]);
    const [trustpilot_urls, setTrustpilot_urls] = useState([]);
    const [google_places, setGoogle_places] = useState([]);
    const [google_my_business_locations, setGoogle_my_business_locations] = useState([]);

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
    const validate = () => {
        const validation = StepsValidations(consts.alert_sources_form, {lang, alertSources});
        if (validation !== true) {
            setLangError(validation.fieldByField('lang'));
            setSourcesError(validation.fieldByField('alertSources'));
            const parent = document.querySelector("#alertStepsSlider");
            if (parent && parent.scroll) parent.scroll(0, 0);
            return;
        }
        if (state.steps && currentStepIndex >= state.steps.length - 1)
            return;

        const requestParams = { lang, alertSources, alertReviews, rssFeeds, excludeWebsites, excludeDomainNames, excludeTweets, opinion_assurances_urls, trip_advisor_urls, booking_urls, expedia_urls, agoda_urls, trustpilot_urls, google_places, google_my_business_locations};
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
                    <AlertiIcons name={"lang"} />
                    <h3>{t('lang')}</h3>
                    <select value={lang} onChange={(e) => setLang(e.target.value)}>
                        {
                            languages.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)
                        }
                    </select>
                    { langError && <div className={communStyles.fieldError}>{langError}</div> }
                </div>
                <div className={communStyles.alertBloc} data-invalid={sourcesError !== null}>
                    <div>
                        <AlertiIcons name={"source"} />
                        <h3>{t('sources')}</h3>
                    </div>
                    <div>
                        <Checkbox checked={checkAllSources}
                                  name={t('all_sources')}
                                  onchange={checkOrUncheckAllSources} />
                    </div>
                    <div>
                        {
                            sources.map(source => (
                                <>
                                <Checkbox key={source}
                                          icon={source}
                                          checked={alertSources.some(src => src == source)}
                                          onchange={() => addOrRemoveSource(source)}
                                          name={t(source)} />
                              </>
                            ))
                        }
                    </div>
                    { sourcesError && <div className={communStyles.fieldError}>{sourcesError}</div> }
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
                            <SearchGooglePlaces iconName={"myBusiness"} onchange={setGoogle_places} placeholder={t('search_google_places_description')} />
                        </div>
                    )
                }
                {
                    alertReviews.some(review => review === 'facebook') && (
                        <div className={communStyles.alertBloc}>
                            <AlertiIcons name={"facebook"} />
                            <h3>{t('facebook_pages')}<FacbookAccount /></h3>
                        </div>
                    )
                }

                <div className={communStyles.alertBloc}>
                    <AlertiIcons name={"rss"} />
                    <h3>{t('rss_feed')}</h3>
                    <RssFeedsInput values={rssFeeds} onchange={setRssFeeds} />
                </div>
                <div className={communStyles.alertBloc}>
                    <AlertiIcons name={"exclude"} />
                    <h3>{t('exclude')}</h3>
                    <div>
                        <ListInput
                            defaultItems={excludeWebsites}
                            onChange={setExcludeWebsites}
                            rules={["url"]}
                            placeholder={t('excluded_website')}
                            description={t('excluded_website_description')} />
                    </div>
                    <span className={communStyles.blocSeparator}>{t('plus')}</span>
                    <div>
                        <ListInput
                            defaultItems={excludeDomainNames}
                            onChange={setExcludeDomainNames}
                            rules={["tld"]}
                            placeholder={t('excluded_domain_names')}
                            description={t('excluded_domain_names_description')} />
                    </div>
                    <span className={communStyles.blocSeparator}>{t('plus')}</span>
                    <div>
                        <ListInput
                            defaultItems={excludeTweets}
                            onChange={setExcludeTweets}
                            rules={["twitter"]}
                            placeholder={t('excluded_tweets')}
                            description={t('excluded_tweets_description')} />
                    </div>
                </div>
            </div>
            <SliderNavigation display={state.steps.length > 1}
                              isFirst={currentStepIndex === 0}
                              isLast={currentStepIndex === state.steps.length - 1}
                              next={validate}
                              prev={back} />
        </>
    );
}