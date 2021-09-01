import styles from "./../styles/commun.module.scss"
import useTranslation from "../../i18n";
import {useEffect, useState} from "react";
import { HiOutlinePlusCircle, HiOutlineTrash } from "react-icons/hi";
import consts from "../helpers/consts";

export default ({ values = [], onchange = () => {} }) => {
    const t = useTranslation();
    const [feeds, setFeeds] = useState(values);
    const [newFeed, setNewFeed] = useState({ url: "", source: "" });
    const sources = consts.alert_sources;
    const addFeed = () => {
        setFeeds([...feeds, Object.assign({}, newFeed)]);
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
                feeds.map(feed => (
                    <div key={feed.url}>
                        <input placeholder={t('URL*')} value={feed.url} onChange={val => newFeed.url = val.target.value}/>
                        <select value={feed.source} onChange={val => newFeed.source = val.target.value}>
                            <option value={""}> </option>
                            {
                                sources.map(source => <option key={source} value={source}>{t(source)}</option>)
                            }
                        </select>
                        <HiOutlineTrash />
                    </div>
                ))
            }
            <div>
                <input placeholder={t('URL*')} onChange={val => newFeed.url = val.target.value}/>
                <select value={newFeed.source} onChange={val => newFeed.source = val.target.value}>
                    <option value={""}> </option>
                    {
                        sources.map(source => <option key={source} value={source}>{t(source)}</option>)
                    }
                </select>
                <HiOutlinePlusCircle title={t('add_rss_feed')} onClick={addFeed} />
            </div>
        </div>
    )
}