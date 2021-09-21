import styles from "./style.module.scss";
import {loadFeeds} from "../../store/actions";
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import FeedsPanel from "./FeedsPanel";
import useTranslation from "../../helpers/i18n";
import FeedsLoader from "../../components/loaders/FeedsLoader";

const Feeds =({ feeds, loadFeeds }) => {
    const [alertiFeeds, setAlertiFeeds] = useState(null);
    const t = useTranslation();

    useEffect(() => {
        if (!feeds) {
            loadFeeds()
        }
    }, [feeds]);
    if (!feeds)
        return <div className={styles.feeds}> <FeedsLoader /> </div>

        return (
        <div className={styles.feeds}>
            <FeedsPanel title={t("recent_rss")} link={"/dashboard/rss"} feeds={feeds.rss.slice(0, 8)} />
            <FeedsPanel title={t("recent_podcasts")} link={"/dashboard/podcasts"} feeds={feeds.podcasts.slice(0, 8)} />
            <FeedsPanel title={t("Alerti")} link={"/dashboard/alerti"} feeds={alertiFeeds} />
        </div>
    )
}

const mapStateToProps = state => ({
    feeds: state.feeds,
});

const mapDispatchToProps = {
    loadFeeds
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Feeds);
