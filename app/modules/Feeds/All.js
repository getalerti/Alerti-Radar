import styles from "./style.module.scss";
import {loadFeeds, viewItem, generateFeeds} from "../../store/actions";
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import FeedsPanel from "./FeedsPanel";
import useTranslation from "../../helpers/i18n";
import FeedsLoader from "../../components/loaders/FeedsLoader";

const Feeds =({ feeds, loadFeeds, viewItem, generateFeeds }) => {
    const t = useTranslation();
    useEffect(() => {
        if (!feeds) {
            loadFeeds()
        }
    }, [feeds]);
    const generateContent = async () => {
        generateFeeds()
    }
    if (!feeds)
        return <div className={styles.feeds}> <FeedsLoader /> </div>
        return (
        <div className={styles.feeds}>
            <FeedsPanel title={t("feeds")} feeds={feeds.content} generateContent={generateContent} viewItemAction={viewItem} single={true} />
        </div>
    )
}

const mapStateToProps = state => ({
    feeds: state.feeds,
});

const mapDispatchToProps = {
    loadFeeds,
    generateFeeds,
    viewItem
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Feeds);
