import styles from "./style.module.scss";
import {useEffect, useState} from "react";
import {formatDate, getSMShareUrl} from "../../helpers/utils";
import FeedPanelLoader from "../../components/loaders/FeedPanelLoader";
import useTranslation from "../../helpers/i18n";
import Link from "next/link";
import {FaRss, FaPodcast, FaList, FaMicrosoft, FaUndo, FaTwitterSquare} from "react-icons/fa";

export default ({feeds, title, link, viewItemAction, generateContent, single = false}) => {
    const [loader, setLoader] = useState(true);
    const [display, setDisplay] = useState("blocs");
    const t = useTranslation()
    const Icon = (type) => type === "podcast" ? <FaPodcast /> : <FaRss />;
    const sharePost = (link) => {
        if (typeof window !== "undefined") {
            window.open(getSMShareUrl("twitter", link), '_blank');
        }
    }
    useEffect(() => {
        if (feeds) {
            console.log(feeds[0])
            setLoader(false)
        } else {
            setLoader(true)
        }
    }, [])
    return <div className={styles.feed}  data-single={single}>
        <p className={styles.feed__items__display} >
            <FaUndo onClick={generateContent}  />
            { display === "blocs" && <FaList onClick={() => { setDisplay("list") }} /> }
            { display === "list" && <FaMicrosoft onClick={() => { setDisplay("blocs") }} /> }
        </p>
        {
            loader && <FeedPanelLoader />
        }
        {
            !loader && <div className={styles.feed__items} data-display={display}>
                {
                    feeds.map((item, index) => (
                        <div key={index} className={styles.feed__item} title={item.title}>
                            <FaTwitterSquare onClick={() => { sharePost(item.link) }} />
                            <div className={styles.feed__bloc__image}>
                                { item.media.type === "img" && <img src={item.media.source} /> }
                                { item.media.type === "svg" && <svg dangerouslySetInnerHTML={{__html: item.media.source}}></svg> }
                            </div>
                            <p onClick={() => {viewItemAction(item)}}>
                                {Icon(item.type)}
                                <span> {item.feed_name}:</span>
                                <span  dangerouslySetInnerHTML={{__html: item.title}}></span>
                            </p>
                            <div  onClick={() => {viewItemAction(item)}} className={styles.feed__item__fullcontent} dangerouslySetInnerHTML={{__html: item.content}}>
                            </div>
                            <span  onClick={() => {viewItemAction(item)}}>{formatDate(item.date)}</span>
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