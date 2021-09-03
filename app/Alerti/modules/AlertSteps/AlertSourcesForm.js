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
    const [reviewsError, setReviewsError] = useState(null);
    const addOrRemoveReview = (review) => {
        const exist = alertReviews.some(_review => _review === review);
        if (exist) {
            setAlertReviews(alertReviews.filter(_review => _review !== review));
        } else {
            setAlertReviews([...alertReviews, review]);
        }
    }

    const [rssFeeds, setRssFeeds] = useState([]);
    const [rssFeedsError, setRssFeedsError] = useState(null);

    const [excludeWebsites, setExcludeWebsites] = useState([]);

    const [excludeDomainNames, setExcludeDomainNames] = useState([]);

    const [excludeTweets, setExcludeTweets] = useState([]);

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
                        { reviewsError && <div className={communStyles.fieldError}>{reviewsError}</div> }
                    </div>
                </div>
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