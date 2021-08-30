import styles from "./style.module.scss"
import {FaRss, FaPodcast, FaGlobe, FaUsers, FaTag, FaKeyboard} from "react-icons/fa";
import useTranslation from "../../i18n";
import AlertDetails from "./../../Alerti/modules/AlertDetails";
import {useState} from "react";
export default () => {
    const t = useTranslation();
    const [selectedItem, setSelectedItem] = useState('rss')

    return (
        <div className={styles.source}>
            <div className={styles.source_items}>
                <div className={styles.source_item}
                     onClick={() => { setSelectedItem('rss') }}
                     data-selected={selectedItem === "rss"} >
                    <FaRss />
                    <span>
                        {t('rss')}
                    </span>
                </div>
                <div className={styles.source_item}
                     onClick={() => { setSelectedItem('podcast') }}
                     data-selected={selectedItem === "podcast"} >
                    <FaPodcast />
                    <span>
                        {t('podcast')}
                    </span>
                </div>
                {/* <div className={styles.source_item}
                      onClick={() => {
                          setSelectedItem('website')
                      }}
                      data-selected={selectedItem === "website"}>
                    <FaGlobe/>
                    <span>
                        {t('website')}
                    </span>
                </div> */}
                <div className={styles.source_item}
                     onClick={() => { setSelectedItem('social') }}
                     data-selected={selectedItem === "social"} >
                    <FaUsers />
                    <span>
                        {t('social')}
                    </span>
                </div>
                <div className={styles.source_item}
                     onClick={() => { setSelectedItem('keywords') }}
                     data-selected={selectedItem === "keywords"} >
                    <FaTag />
                    <span>
                        {t('keywords')}
                    </span>
                </div>
                <div className={styles.source_item}
                     onClick={() => { setSelectedItem('reviews') }}
                     data-selected={selectedItem === "reviews"} >
                    <FaTag />
                    <span>
                        {t('reviews')}
                    </span>
                </div>
            </div>
            {
                (selectedItem === "podcast" || selectedItem === "rss") ? (
                    <>
                        <input type={"hidden"} name={"source_type"} id={"source_type"} value={selectedItem}/>
                        <h2>{t('feed_source_title')}</h2>
                        <div className={styles.input_group_source}>
                            <FaKeyboard/>
                            <input type={"text"} name={"source_data"} id={"source_data"} className={styles.input_source} placeholder={t('type_feed_source')}/>
                        </div>
                    </>
                ) : <AlertDetails alertType={selectedItem} />
            }
        </div>
    )
}