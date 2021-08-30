import styles from "./../styles/commun.module.scss"
import { BsFillTrashFill } from "react-icons/bs";
import {useState} from "react";
import useTranslation from "./../../i18n";

export default ({placeholder, defaultItems = [], onChange, description = ""}) => {
    const t = useTranslation();
    const [items, setItems] = useState(defaultItems)
    const [newItem, setNewItem] = useState("");
    const typingHandler = (e) => {
        if (e.keyCode === 13) {
            if (items.indexOf(newItem) !== -1) {
                setNewItem("")
                return;
            }
            setItems([...items, newItem])
            setNewItem("")
        }
    }
    return (
        <div className={styles.list_keyword_input}>
            <div className={styles.list_keywords_items}>
                {
                    items.map(item => {
                        return (
                            <span className={"input-list-item"}>
                                <BsFillTrashFill onClick={() => {
                                    setItems(items.filter(_item => _item !== item))
                                }} />
                                {item}
                            </span>
                        )
                    })
                }
            </div>
            <input type={"text"}
                   placeholder={placeholder}
                   value={newItem}
                   onChange={(e) => { setNewItem(e.target.value) }}
                   onKeyUp={typingHandler}  />
            <span className={styles.list_keyword_input_info}>
                {t('hit_enter_keywords')}
                { description !== "" && <><br />{description}</> }
            </span>
        </div>
    )
}