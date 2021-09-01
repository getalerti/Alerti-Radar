import styles from "./style.module.scss";
import {useEffect, useState} from "react";
import {formatDate} from "../../utils";
import FeedPanelLoader from "../../components/loaders/FeedPanelLoader";
import useTranslation from "./../../i18n";
import {FaRss} from "react-icons/fa";
import Link from "next/link";

export default ({feeds, title, link, viewItemAction, single = false}) => {
    const [loader, setLoader] = useState(true);
    const t = useTranslation()
    useEffect(() => {
        console.log({feeds})
        if (feeds) {
            setLoader(false)
        } else {
            setLoader(true)
        }
    }, [])
    return <div className={styles.feed}  data-single={single}>
        <h4>{title}</h4>
        {
            loader && <FeedPanelLoader />
        }
        {
            !loader && <div className={styles.feed__items}>
                {
                    feeds.map((item, index) => (
                        <div key={index} className={styles.feed__item} title={item.title} onClick={() => {viewItemAction(item)}}>
                            <p><span>{item.feed_name}:</span>{item.title}</p>
                            <span>{formatDate(item.date)}</span>
                        </div>
                    ))
                }
            </div>
        }
        {
            (!loader && !single) && <Link href={link}>
               <span className={styles.feed__items__cta}>{t('view_all')}</span>
            </Link>
        }

    </div>
}