import styles from "./style.module.scss"
import topics from "../../helpers/topics"
import useTranslation from "../../helpers/i18n";
import {useEffect, useState} from "react";
import consts from "../../helpers/consts";
export default ({ setTopics, setNext }) => {
    const t = useTranslation();
    const [selectedItems, setSelectedItems] = useState([]);
    const selectItem = (index) => {
        const exist = selectedItems.indexOf(index) >= 0;
        let newItems = [];
        if (exist)
            newItems = selectedItems.filter(item => item !== index);
        else
            newItems = [...selectedItems, index]
        setTopics(newItems);
        setSelectedItems(newItems);
        window.localStorage.setItem(consts.userSelectedTopics, JSON.stringify(newItems))
    }
    useEffect(() => {
        if (typeof window !== "undefined") {
            const topics = window.localStorage.getItem(consts.userSelectedTopics);
            if (topics) {
                setNext("login")
            }
        }
    }, [])
    return (
        <div  className={styles.topics_container}>
        <h2 className={styles["title-1"]}>
            {t("signup-title")}
        </h2>
        <p className={styles.description}>
            {
                t("signin-description")
            }
        </p>
        <div className={styles.topics}>
            {
                topics.map((topic, index) => {
                    return (
                        <div key={index} className={styles.topic + " " + (selectedItems.indexOf(index) >= 0 ? styles.active : "")}
                             style={{
                                backgroundImage: `url("${topic.image}")`
                            }}
                             onClick={() => { selectItem(index) }}
                             key={index}>
                            <h3>{topic.name}</h3>
                            <p>{topic.subtitle}</p>
                        </div>
                    )
                })
            }
        </div>
        <div className={styles.navigation}>
            <button onClick={() => { setNext("login") }} className={styles.btn}>{t("next")}</button>
        </div>
        </div>
    )
}