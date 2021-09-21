import styles from "./style.module.scss";
import {loadFeeds, viewItem} from "../../store/actions";
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import FeedsPanel from "./FeedsPanel";
import useTranslation from "../../helpers/i18n";
import FeedsLoader from "../../components/loaders/FeedsLoader";

const Feeds =({ feeds, loadFeeds, viewItem }) => {
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
            <FeedsPanel title={t("podcasts")} feeds={feeds.podcasts} viewItemAction={viewItem} single={true} />
        </div>
    )
}

const mapStateToProps = state => ({
    feeds: state.feeds,
});

const mapDispatchToProps = {
    loadFeeds,
    viewItem
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Feeds);
