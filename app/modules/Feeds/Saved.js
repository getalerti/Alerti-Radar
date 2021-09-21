import styles from "./style.module.scss";
import {loadSavedItems, viewItem} from "../../store/actions";
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import FeedsPanel from "./FeedsPanel";
import useTranslation from "../../helpers/i18n";
import FeedsLoader from "../../components/loaders/FeedsLoader";

const Feeds =({ feeds, loadSavedItems, viewItem }) => {
    const t = useTranslation();

    useEffect(() => {
        if (!feeds) {
            loadSavedItems()
        }
    }, [feeds]);
    if (!feeds)
        return <div className={styles.feeds}> <FeedsLoader /> </div>

        return (
        <div className={styles.feeds}>
            <FeedsPanel title={t("saved_items")} feeds={feeds} viewItemAction={viewItem}  single={true} />
        </div>
    )
}

const mapStateToProps = state => ({
    feeds: state.saved_items,
});

const mapDispatchToProps = {
    loadSavedItems,
    viewItem
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Feeds);
