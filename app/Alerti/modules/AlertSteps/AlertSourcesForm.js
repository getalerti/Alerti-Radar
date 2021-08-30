import styles from "./style.module.scss";
import communStyles from "./../../styles/commun.module.scss";
import AlertiIcons from "../../components/AlertiIcons";
import useTranslation from "./../../../i18n";
import ListInput from "../../components/ListInput";
import consts from "../../helpers/consts";
import Checkbox from "../../components/Checkbox";
import RssFeedsInput from "../../components/RssFeedsInput";

export default ({ onChangeHandler }) => {
    const t = useTranslation();
    const languages = consts.languages;
    const sources = consts.alert_sources;
    const reviews = consts.alert_reviews_sources;
    return (
        <div className={styles.sources}>
            <div className={communStyles.alertBloc}>
                <AlertiIcons name={"lang"} />
                <h3>{t('lang')}</h3>
                <select>
                    {
                        languages.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)
                    }
                </select>
            </div>
            <div className={communStyles.alertBloc}>
                <div>
                    <AlertiIcons name={"source"} />
                    <h3>{t('sources')}</h3>
                </div>
                <div>
                    <Checkbox value={false} name={t('all_sources')} />
                </div>
                <div>
                    {
                        sources.map(source => <Checkbox key={source} icon={source} value={false} name={t(source)} />)
                    }
                </div>
            </div>
            <div className={communStyles.alertBloc}>
                <div>
                    <AlertiIcons name={"reviews"} />
                    <h3>{t('reviews')}</h3>
                </div>
                <div>
                    {
                        reviews.map(review => <Checkbox key={review} icon={review} value={false} name={t(review)} />)
                    }
                </div>
            </div>
            <div className={communStyles.alertBloc}>
                <AlertiIcons name={"rss"} />
                <h3>{t('rss_feed')}</h3>
                <RssFeedsInput />
            </div>
            <div className={communStyles.alertBloc}>
                <AlertiIcons name={"exclude"} />
                <h3>{t('exclude')}</h3>
                <div>
                    <ListInput
                        placeholder={t('excluded_website')}
                        description={t('excluded_website_description')} />
                </div>
                <span className={communStyles.blocSeparator}>{t('plus')}</span>
                <div>
                    <ListInput
                        placeholder={t('excluded_domain_names')}
                        description={t('excluded_domain_names_description')} />
                </div>
                <span className={communStyles.blocSeparator}>{t('plus')}</span>
                <div>
                    <ListInput
                        placeholder={t('excluded_tweets')}
                        description={t('excluded_tweets_description')} />
                </div>
            </div>
        </div>
    );
}