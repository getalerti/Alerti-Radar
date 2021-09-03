import styles from "./../styles/commun.module.scss"
import useTranslation from "../../i18n";
import {useEffect, useState} from "react";
import { HiOutlinePlusCircle, HiOutlineTrash } from "react-icons/hi";
import consts from "../helpers/consts";
import {isNotEmpty, isURL} from "../../utils";
import {msg} from "../helpers/utils";

export default ({ values = [], onchange = () => {} }) => {
    const t = useTranslation();
    const [error, setError] = useState(null);
    const [feeds, setFeeds] = useState(values);
    const [newFeedURL, setNewFeedURL] = useState("");
    const [newFeedType, setNewFeedType] = useState("");
    const sources = consts.alert_sources;
    const newFeedValidation = () => {
        setError(null);
        if (!isURL(newFeedURL)) {
            setError(msg('invalid_input', t('url')));
            return false;
        }
        if (!isNotEmpty(newFeedType)) {
            setError(msg('invalid_input', t('source')));
            return false;
        }
        return true;
    }
    const addFeed = () => {
        if (!newFeedValidation()) return;
        setFeeds([...feeds, {url: newFeedURL, type: newFeedType}]);
        clearNewItem();
    }
    const clearNewItem = () => {
        setNewFeedType("");
        setNewFeedURL("");
    }
    const removeFeed = (index) => {
        setFeeds(feeds.filter((_, _index) => _index !== index));
        clearNewItem();
    }
    useEffect(() => {
        onchange(feeds);
    }, [feeds])
    return (
        <div className={styles.rssFeedsInput}>
            <p>
                {t('alerti_rss_feeds_title')}
            </p>
            {
                feeds.map((feed, index) => (
                    <div key={index}>
                        <input placeholder={t('URL*')} value={feed.url} disabled/>
                        <select  value={feed.type} disabled>
                            <option value={""}> </option>
                            {
                                sources.map(source => <option key={source} value={source}>{t(source)}</option>)
                            }
                        </select>
                        <HiOutlineTrash onClick={() => removeFeed(index)} />
                    </div>
                ))
            }
            <div>
                <input placeholder={t('URL*')} value={newFeedURL} onChange={val => setNewFeedURL(val.target.value)}/>
                <select value={newFeedType} onChange={val => setNewFeedType(val.target.value)}>
                    <option value={""}> </option>
                    {
                        sources.map(source => <option key={source} value={source}>{t(source)}</option>)
                    }
                </select>
                <HiOutlinePlusCircle title={t('add_rss_feed')} onClick={addFeed} />
            </div>
            {error && <div className={styles.fieldError}>{error}</div>}
        </div>
    )
}