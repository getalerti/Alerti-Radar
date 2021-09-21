import styles from "./style.module.scss"
import {FaRss, FaPodcast, FaUsers, FaTag, FaKeyboard} from "react-icons/fa";
import useTranslation from "../../helpers/i18n";
import AlertDetails from "./../../Alerti/modules/AlertDetails";
import {useState} from "react";
import consts from "../../helpers/consts";
export default () => {
    const t = useTranslation();
    const [selectedItem, setSelectedItem] = useState('keywords')
    const getIcon = (type) => {
        switch (type) {
            case consts.alertTypeRss:
                return <FaRss />;
            case consts.alertTypePodcast:
                return <FaPodcast />;
            case consts.alertTypeSocial:
                return <FaUsers />;
            case consts.alertTypeReviews:
                return <FaTag />;
            case consts.alertTypeKeywords:
                return <FaTag />;
        }
    }
    return (
        <div className={styles.source}>
            <div className={styles.source_items}>
                {
                    consts.alertTypes.map((type, index) => {
                        return (
                            <div className={styles.source_item}
                                 key={index}
                                 onClick={() => { setSelectedItem(type) }}
                                 data-selected={selectedItem === type} >
                                {getIcon(type)}
                                <span>
                                    {t(type)}
                                </span>
                            </div>
                        )
                    })
                }
            </div>
            {
                (selectedItem === consts.alertTypePodcast || selectedItem === consts.alertTypeRss) ? (
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